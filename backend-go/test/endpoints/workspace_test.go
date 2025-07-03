package endpoints

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"net/http/httptest"
	"testing"
)

func workspaceApiCreate(workspaceName string) (int, error) {
	workspaceData, err := json.Marshal(map[string]string{
		"name": workspaceName,
	})
	if err != nil {
		return 0, fmt.Errorf("json marshal request data: %v\n", err)
	}
	r := httptest.NewRequest("POST", "http://localhost:4000/api/workspace", bytes.NewBuffer(workspaceData))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.WorkspaceCreateHandler(w, r)

	resp := w.Result()
	var message map[string]any
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		return 0, fmt.Errorf("status code %v", resp.StatusCode)
	}
	if err = json.NewDecoder(resp.Body).Decode(&message); err != nil {
		return 0, fmt.Errorf("json decoding response body: %v\n", err)
	}
	workspaceIDf, ok := message["id"].(float64)
	if !ok {
		return 0, fmt.Errorf("workspace_id float conversion failed")
	}
	return int(workspaceIDf), err
}

func workspaceApiDelete(workspaceID int) error {
	r := httptest.NewRequest("DELETE", "http://localhost:4000/api/workspace/", nil)
	r.SetPathValue("workspace_id", fmt.Sprint(workspaceID))
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.WorkspaceDeleteHandler(w, r)

	resp := w.Result()
	var message map[string]string
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		return fmt.Errorf("status code %v", resp.StatusCode)
	}
	if err := json.NewDecoder(resp.Body).Decode(&message); err != nil {
		log.Println(fmt.Errorf("json decoding response body: %v\n", err))
	}
	return nil
}

func workspaceDbCreate(workspaceName string) error {
	_, err := s.Conn.Exec(context.Background(), `INSERT INTO workspaces
		(name, user_id) VALUES ($1, $2)`, workspaceName, USER_ID)
	if err != nil {
		return fmt.Errorf("workspace insert value: %v", err)
	}
	return nil
}

func workspaceDbDelete(workspaceID int) error {
	if _, err := s.Conn.Exec(context.Background(), `DELETE FROM workspaces
	WHERE id = $1`, workspaceID); err != nil {
		return fmt.Errorf("workspace object delete exec: %v", err)
	}
	return nil
}

func TestWorkspaceCreate(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceApiCreate(workspaceName)
	if err != nil {
		t.Fatalf("workspace api create: %v", err)
	}

	if err = workspaceDbDelete(workspaceID); err != nil {
		t.Fatalf("workspace db delete: %v", err)
	}
}
