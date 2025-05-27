package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"local.formstore.admin/db"
)

type Form struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	WorkspaceID string    `json:"workspace_id"`
}

type FormElement struct {
	ID          int64  `json:"id"`
	Type        string `json:"type"`
	Label       string `json:"label"`
	Description string `json:"description"`
}

type FormData struct {
	Form         Form          `json:"form"`
	Workspace    Workspace     `json:"workspace"`
	FormElements []FormElement `json:"form_elements"`
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
			workspace.ID = int64(row.ID_2)
			workspace.Name = row.Name
			workspace.CreatedAt = row.CreatedAt_2.Time
			workspace.UpdatedAt = row.UpdatedAt_2.Time
			workspace.UserID = int64(row.UserID)
			formData.Form = form
			formData.Workspace = workspace
		}

		var element FormElement
		if row.ID_3.Valid {
			element.ID = int64(row.ID_3.Int32)
			val, err := row.ElementType.Value()
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
		workspaceRow, err := s.Queries.GetWorkspaceByID(r.Context(), db.GetWorkspaceByIDParams{
			ID:     int32(workspaceID),
			UserID: int32(userID),
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
	workspaceID, err := strconv.Atoi(r.PathValue("workspace_id"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "invalid value for workspace id",
		}); err != nil {
			log.Println(err)
		}
		return
	}

	var data map[string]interface{}
	var formTitle string
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
	formTitle, ok := data["title"].(string)
	if !ok || formTitle == "" {
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "title not found",
		}); err != nil {
			log.Println(err)
		}
	}
	row := s.Conn.QueryRow(context.Background(), `SELECT user_id FROM workspaces WHERE id = $1`, workspaceID)
	var dbUserID int64
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
	rows, err := s.Queries.GetFormDataAndElements(r.Context(), db.GetFormDataAndElementsParams{
		ID:     int32(formID),
		UserID: int32(userID),
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
	type FormData struct {
		ID int64 `json:"id"`
	}
	var formData FormData
	if err := json.NewDecoder(r.Body).Decode(&formData); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("required field `id` is missing"))
		return
	}
	res, err := s.Conn.Exec(r.Context(), `
		DELETE FROM forms
		WHERE forms.ID = $1
		AND forms.workspace_id IN (
			SELECT workspaces.ID
			FROM workspaces
			WHERE user_id = $2
		)`, formData.ID, userID)

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
