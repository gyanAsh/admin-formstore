package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/jackc/pgx/v5"
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
	rows, err := s.Queries.GetWorkspacesForUser(r.Context(), int32(userID))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	workspaces := parseRowsToWorkspaces(rows, userID)
	sort.Slice(workspaces, func(i, j int) bool {
		return workspaces[i].CreatedAt.Before(workspaces[j].CreatedAt)
	})
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

func (s *Service) workspaceUpdateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var workspace Workspace
	if err = json.NewDecoder(r.Body).Decode(&workspace); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if workspace.ID == 0 || workspace.Name == "" {
		log.Println(fmt.Errorf("empty values in workspace"))
		log.Println(workspace)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	workspace.UpdatedAt = time.Now()
	workspace.UserID = userID

	row := s.Conn.QueryRow(r.Context(), `SELECT user_id FROM workspaces
		WHERE ID = $1 AND user_id = $2`, workspace.ID,
		workspace.UserID)
	var dbUserID int64
	if err = row.Scan(&dbUserID); err != nil {
		log.Println(err)
		if err == pgx.ErrNoRows {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if dbUserID != workspace.UserID {
		log.Println(fmt.Errorf("queried user id did not match"))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	row = s.Conn.QueryRow(r.Context(), `UPDATE workspaces SET name = $1,
		updated_at = $2 WHERE ID = $3 RETURNING created_at`, workspace.Name,
		workspace.UpdatedAt, workspace.ID)
	if err = row.Scan(&workspace.CreatedAt); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err = json.NewEncoder(w).Encode(workspace); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (s *Service) workspaceDeleteHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var workspace Workspace
	if err = json.NewDecoder(r.Body).Decode(&workspace); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if workspace.ID == 0 {
		log.Println(fmt.Errorf("empty values in workspace"))
		log.Println(workspace)
		return
	}
	workspace.UserID = userID

	if _, err = s.Conn.Exec(r.Context(), `DELETE FROM workspaces WHERE
		workspaces.ID = $1 AND user_id = $2`, workspace.ID, userID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusForbidden)
		return
	}
}
