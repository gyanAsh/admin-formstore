package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
)

type Form struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	WorkspaceID string    `json:"workspace_id"`
}

type FormElement struct {
	ID    int64  `json:"id,omitempty"`
	Type  string `json:"type,omitempty"`
	Value string `json:"value,omitempty"`
}

// nil values are pointers
type RowFormData struct {
	// form
	FormID        int64
	FormTitle     string
	FormCreatedAt time.Time
	FormUpdatedAt time.Time
	// workspace
	WorkspaceID        int64
	WorkspaceName      string
	WorkspaceCreatedAt time.Time
	WorkspaceUpdatedAt time.Time
	// user
	UserID int64
	// form elements
	FormElementID    *int64
	FormElementType  *string
	FormElementValue *string
}

type FormData struct {
	Form         Form          `json:"form"`
	Workspace    Workspace     `json:"workspace"`
	FormElements []FormElement `json:"form_elements"`
}

func parseFormData(rows []RowFormData) (FormData, error) {
	if len(rows) == 0 {
		return FormData{}, fmt.Errorf("failed to parse rows: no rows found")
	}
	var formData FormData
	formData.Form.ID = rows[0].FormID
	formData.Form.Title = rows[0].FormTitle
	formData.Form.CreatedAt = rows[0].FormCreatedAt
	formData.Form.UpdatedAt = rows[0].FormUpdatedAt
	formData.Workspace.ID = rows[0].WorkspaceID
	formData.Workspace.Name = rows[0].WorkspaceName
	formData.Workspace.CreatedAt = rows[0].WorkspaceCreatedAt
	formData.Workspace.UpdatedAt = rows[0].WorkspaceUpdatedAt
	for _, row := range rows {
		var element FormElement
		if row.FormElementID != nil {
			element.ID = *row.FormElementID
		}
		if row.FormElementType != nil {
			element.Type = *row.FormElementType
		}
		if row.FormElementValue != nil {
			element.Value = *row.FormElementValue
		}
		formData.FormElements = append(formData.FormElements, element)
	}
	return formData, nil
}

func (s *Service) formsHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	workspaceID := r.PathValue("workspace_id")
	if workspaceID == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	rows, err := s.DB.Query(r.Context(), `
		SELECT
			forms.ID, forms.title, forms.created_at, forms.updated_at,
			workspaces.ID, workspaces.name, workspaces.created_at,
			workspaces.updated_at
		FROM
			forms
		INNER JOIN
			workspaces
		ON
			forms.workspace_id = workspaces.id
		WHERE
			workspace_id = $1
		AND
			workspaces.user_id = $2
		`,
		workspaceID, userID)
	defer rows.Close()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var forms []Form
	var workspace Workspace
	for rows.Next() {
		var form Form
		if err = rows.Scan(&form.ID, &form.Title, &form.CreatedAt,
			&form.UpdatedAt, &workspace.ID, &workspace.Name,
			&workspace.CreatedAt, &workspace.UpdatedAt); err != nil {
			form.WorkspaceID = strconv.Itoa(int(workspace.ID))
			log.Println(err)
			continue
		}
		forms = append(forms, form)
	}
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
	row := s.DB.QueryRow(context.Background(), `SELECT user_id FROM workspaces WHERE id = $1`, workspaceID)
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
	row = s.DB.QueryRow(context.Background(), `INSERT INTO forms (title,
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
	rows, err := s.DB.Query(r.Context(), `
		SELECT
			-- form
			forms.ID,
			forms.title,
			forms.created_at,
			forms.updated_at,
			-- workspace
			workspaces.ID,
			workspaces.name,
			workspaces.created_at,
			workspaces.updated_at,
			-- user
			workspaces.user_id,
			-- form elements (null values, due to left outer join)
			form_elements.ID,
			form_elements.element_type,
			form_elements.value
		FROM
			forms
		INNER JOIN
			workspaces
		ON
			forms.workspace_id = workspaces.ID
		LEFT OUTER JOIN
			form_elements
		ON
			form_elements.form_id = forms.ID
		WHERE
			forms.ID = $1
		AND
			workspaces.user_id = $2
		`, formID, userID)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var rowsData []RowFormData
	for rows.Next() {
		var rowData RowFormData
		if err := rows.Scan(
			// forms
			&rowData.FormID,
			&rowData.FormTitle,
			&rowData.FormCreatedAt,
			&rowData.FormUpdatedAt,
			// workspace
			&rowData.WorkspaceID,
			&rowData.WorkspaceName,
			&rowData.WorkspaceCreatedAt,
			&rowData.WorkspaceUpdatedAt,
			// user
			&rowData.UserID,
			// form elements
			&rowData.FormElementID,
			&rowData.FormElementType,
			&rowData.FormElementValue,
		); err != nil {
			log.Println(err)
			continue
		}
		rowsData = append(rowsData, rowData)
	}
	formData, err := parseFormData(rowsData)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if err = json.NewEncoder(w).Encode(formData); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
