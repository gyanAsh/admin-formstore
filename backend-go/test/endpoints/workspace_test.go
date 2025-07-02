package endpoints

import (
	"bytes"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"net/http/httptest"
	"testing"
)

func workspaceCreate(workspaceName string) (int, error) {
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

func workspaceDelete(workspaceID int) error {
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

func TestWorkspaceCreate(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatalf("workspace create: %v", err)
	}

	if err = workspaceDelete(workspaceID); err != nil {
		t.Fatalf("workspace delete: %v", err)
	}
}
