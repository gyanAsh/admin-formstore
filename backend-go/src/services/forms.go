package services

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
)

type Form struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	WorkspaceID string    `json:"workspace_id"`
}

func (s *Service) formsHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := authenticate(r, s.JwtSecret)
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
			forms.workspace_id
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
	for rows.Next() {
		var form Form
		if err = rows.Scan(&form.ID, &form.Title, &form.CreatedAt,
			&form.UpdatedAt, &form.WorkspaceID); err != nil {
			log.Println(err)
			continue
		}
		forms = append(forms, form)
	}
	if err = json.NewEncoder(w).Encode(forms); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func (s *Service) formCreateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := authenticate(r, s.JwtSecret)
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
	userID, err := authenticate(r, s.JwtSecret)
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
	row := s.DB.QueryRow(r.Context(), `
		SELECT
			forms.ID, forms.title, forms.created_at, forms.updated_at,
			workspaces.ID, workspaces.name, workspaces.user_id,
			workspaces.created_at, workspaces.updated_at
		FROM
			forms
		INNER JOIN
			workspaces
		ON
			forms.workspace_id = workspaces.id
		WHERE
			forms.ID = $1
		AND
			workspaces.user_id = $2
		`, formID, userID)
	var form Form
	var workspace Workspace
	if err := row.Scan(&form.ID, &form.Title, &form.CreatedAt, &form.UpdatedAt,
		&workspace.ID, &workspace.Name, &workspace.UserID, &workspace.CreatedAt,
		&workspace.UpdatedAt); err != nil {
		log.Println(err)
		if err == pgx.ErrNoRows {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if err = json.NewEncoder(w).Encode(map[string]interface{}{
		"form":      form,
		"workspace": workspace,
	}); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
