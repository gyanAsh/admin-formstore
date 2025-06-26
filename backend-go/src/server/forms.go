package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"local.formstore.admin/db"
)

type Form struct {
	ID          int64          `json:"id"`
	Title       string         `json:"title"`
	Status      string         `json:"status"`
	Design      map[string]any `json:"design"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	WorkspaceID string         `json:"workspace_id,omitempty"`
}

type FormElement struct {
	SeqNumber   int32          `json:"seq_number"`
	Type        string         `json:"type"`
	Label       string         `json:"label"`
	Description string         `json:"description"`
	Properties  map[string]any `json:"properties"`
	Required    bool           `json:"required"`
}

type FormData struct {
	Form         Form          `json:"form"`
	Workspace    Workspace     `json:"workspace"`
	FormElements []FormElement `json:"elements"`
}

func parseFormDataAndElements(rows []db.GetFormDataAndElementsRow) FormData {
	var formData FormData
	formData.FormElements = []FormElement{}
	for i, row := range rows {
		if i == 0 {
			var form Form
			var workspace Workspace
			form.ID = int64(row.ID)
			form.Title = row.Title
			form.CreatedAt = row.CreatedAt.Time
			form.UpdatedAt = row.UpdatedAt.Time
			form.Status = string(row.Status)
			if err := json.Unmarshal(row.Design, &form.Design); err != nil {
				log.Println(fmt.Errorf("form desgin json:  %v", err))
			}
			workspace.ID = int64(row.ID_2)
			workspace.Name = row.Name
			workspace.CreatedAt = row.CreatedAt_2.Time
			workspace.UpdatedAt = row.UpdatedAt_2.Time
			workspace.UserID = row.UserID.String()
			formData.Form = form
			formData.Workspace = workspace
		}

		var element FormElement
		if row.SeqNumber.Valid {
			element.SeqNumber = row.SeqNumber.Int32
			val, err := row.Type.Value()
			var ok bool
			element.Type, ok = val.(string)
			if !ok {
				log.Println(fmt.Errorf("invalid value for element type"))
			}
			if err != nil {
				log.Println(err)
			}
			element.Label = row.Label.String
			element.Description = row.Description.String
			if err = json.Unmarshal(row.Properties, &element.Properties); err != nil {
				log.Println(err)
			}
			element.Required = row.Required.Bool
			formData.FormElements = append(formData.FormElements, element)
		}
	}
	return formData
}

func (s *Service) formsHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	workspaceID, err := strconv.Atoi(r.PathValue("workspace_id"))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid workspace id"))
		return
	}
	type WorkspaceRes struct {
		data Workspace
		err  error
	}
	workspaceChan := make(chan WorkspaceRes)
	go func(c chan WorkspaceRes) {
		userIDb, err := convertUUIDStringToBin(userID)
		if err != nil {
			c <- WorkspaceRes{
				data: Workspace{},
				err:  err,
			}
			return
		}
		workspaceRow, err := s.Queries.GetWorkspaceByID(r.Context(), db.GetWorkspaceByIDParams{
			ID:     int32(workspaceID),
			UserID: pgtype.UUID{Bytes: userIDb, Valid: true},
		})
		workspace := Workspace{
			ID:        int64(workspaceRow.ID),
			Name:      workspaceRow.Name,
			CreatedAt: workspaceRow.CreatedAt.Time,
			UpdatedAt: workspaceRow.UpdatedAt.Time,
		}
		c <- WorkspaceRes{
			data: workspace,
			err:  err,
		}
	}(workspaceChan)
	formRows, err := s.Queries.GetFormsInWorkspace(r.Context(), int32(workspaceID))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var forms []Form
	for _, row := range formRows {
		var form Form
		form.ID = int64(row.ID)
		form.Title = row.Title
		form.CreatedAt = row.CreatedAt.Time
		form.UpdatedAt = row.UpdatedAt.Time
		form.Status = string(row.Status)
		forms = append(forms, form)
	}
	workspaceRes := <-workspaceChan
	err = workspaceRes.err
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("invalid workspace"))
		return
	}
	workspace := workspaceRes.data
	if err = json.NewEncoder(w).Encode(map[string]interface{}{
		"forms":     forms,
		"workspace": workspace,
	}); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func (s *Service) formCreateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var data map[string]interface{}
	if err = json.NewDecoder(r.Body).Decode(&data); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "failed to parse json data",
		}); err != nil {
			log.Println(err)
		}
		return
	}

	workspaceIDf, ok := data["workspace_id"].(float64)
	if !ok {
		log.Println("failed to parse workspace id")
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "invalid value for workspace id",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	workspaceID := int32(workspaceIDf)

	var formTitle string
	formTitle, ok = data["title"].(string)
	if !ok || formTitle == "" {
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "title not found",
		}); err != nil {
			log.Println(err)
		}
	}
	row := s.Conn.QueryRow(context.Background(), `SELECT user_id FROM workspaces WHERE id = $1`, workspaceID)
	var dbUserID string
	if err = row.Scan(&dbUserID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if dbUserID != userID {
		log.Println("workspace does not belong to the current user")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "insufficient permission to make specificed changes",
		})
		return
	}
	row = s.Conn.QueryRow(context.Background(), `INSERT INTO forms (title,
		workspace_id) VALUES ($1, $2) RETURNING ID, title, created_at,
	updated_at, workspace_id`, formTitle, workspaceID)
	var form Form
	if err = row.Scan(&form.ID, &form.Title, &form.CreatedAt, &form.UpdatedAt, &form.WorkspaceID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if err = json.NewEncoder(w).Encode(form); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (s *Service) formDataHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	formID, err := strconv.Atoi(r.PathValue("form_id"))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	userIDb, err := convertUUIDStringToBin(userID)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	rows, err := s.Queries.GetFormDataAndElements(r.Context(), db.GetFormDataAndElementsParams{
		ID:     int32(formID),
		UserID: pgtype.UUID{Bytes: userIDb, Valid: true},
	})
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	formData := parseFormDataAndElements(rows)
	if err = json.NewEncoder(w).Encode(formData); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (s *Service) formDeleteHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	formID, err := strconv.Atoi(r.PathValue("form_id"))
	if err != nil {
		log.Println(fmt.Errorf("form id parsing int: %v", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	res, err := s.Conn.Exec(r.Context(), `
		DELETE FROM forms
		WHERE forms.ID = $1
		AND forms.workspace_id IN (
			SELECT workspaces.ID
			FROM workspaces
			WHERE user_id = $2
		)`, formID, userID)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("user doesn't have permission to delete this form"))
		return
	}
	if count := res.RowsAffected(); count == 0 {
		log.Println(fmt.Errorf("delete no rows id doesn't exist"))
		w.WriteHeader(http.StatusNotModified)
		return
	}
}

func (s *Service) formUpdateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var form Form
	if err = json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if form.Title == "" {
		log.Println(fmt.Errorf("form title is empty"))
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("title should not be empty"))
		return
	}

	_, err = s.Conn.Exec(r.Context(), `
		UPDATE forms
		SET title = $1
		WHERE
			ID = $2
		AND
		workspace_id IN (
			SELECT ID FROM workspaces WHERE user_id = $3
		)
		`, form.Title, form.ID, userID)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
