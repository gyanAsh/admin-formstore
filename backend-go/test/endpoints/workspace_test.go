package endpoints

import (
	"bytes"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http/httptest"
	"strconv"
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
	w := httptest.NewRecorder()

	s.WorkspaceCreateHandler(w, r)

	resp := w.Result()
	var message map[string]string
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		return 0, fmt.Errorf("create workspace failed with incorrect status code %v", resp.StatusCode)
	}
	if err = json.NewDecoder(resp.Body).Decode(&message); err != nil {
		return 0, fmt.Errorf("json decoding response body: %v\n", err)
	}
	workspaceID, err := strconv.Atoi(message["id"])
	if err != nil {
		return 0, fmt.Errorf("integer conversion: %v", err)
	}
	return workspaceID, err
}

func workspaceDelete(workspaceID int) error {
	r := httptest.NewRequest("DELETE", fmt.Sprintf("http://localhost:4000/api/workspace/%d", workspaceID), nil)
	w := httptest.NewRecorder()

	s.WorkspaceDeleteHandler(w, r)

	resp := w.Result()
	var message map[string]string
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		return fmt.Errorf("create workspace failed with incorrect status code %v", resp.StatusCode)
	}
	if err := json.NewDecoder(resp.Body).Decode(&message); err != nil {
		return fmt.Errorf("json decoding response body: %v\n", err)
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
