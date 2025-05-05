package server

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"local.formstore.admin/db"
)

type WorkspaceRequest struct {
	Name string `json:"name"`
}

type Workspace struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	UserID    int64     `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func parseRowsToWorkspaces(rows []db.GetWorkspacesForUserRow, userID int64) []Workspace {
	var workspaces []Workspace
	for _, row := range rows {
		var workspace Workspace
		workspace.ID = int64(row.ID)
		workspace.Name = row.Name
		workspace.UserID = userID
		workspace.CreatedAt = row.CreatedAt.Time
		workspace.UpdatedAt = row.UpdatedAt.Time
		workspaces = append(workspaces, workspace)
	}
	return workspaces
}

func (s *Service) workspacesHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	rows, err := s.DB.GetWorkspacesForUser(r.Context(), int32(userID))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	workspaces := parseRowsToWorkspaces(rows, userID)
	if err = json.NewEncoder(w).Encode(workspaces); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (s *Service) workspaceCreateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var workspaceRequest WorkspaceRequest
	if err := json.NewDecoder(r.Body).Decode(&workspaceRequest); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "failed to parse json data",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	row := s.Conn.QueryRow(context.Background(), `INSERT INTO workspaces
		(name, user_id) VALUES ($1, $2) RETURNING ID, created_at,
	updated_at`, workspaceRequest.Name, userID)
	var workspace Workspace
	if err = row.Scan(&workspace.ID, &workspace.CreatedAt,
		&workspace.UpdatedAt); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "failed to create new workspace",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	workspace.Name = workspaceRequest.Name
	workspace.UserID = userID

	if err = json.NewEncoder(w).Encode(workspace); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
