package endpoints

import (
	"bytes"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"io"
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
	r := httptest.NewRequest("DELETE", "http://localhost:4000/api/workspace/{workspace_id}", nil)
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
		// add a io reader log here i.e. for body type string
		log.Println(fmt.Errorf("json decoding response body: %v\n", err))
	}
	return nil
}

func workspaceApiUpdate(workspaceID int, workspaceName string) error {
	workspacedat, err := json.Marshal(map[string]any{
		"id":   workspaceID,
		"name": workspaceName,
	})
	if err != nil {
		return fmt.Errorf("workspace data marshal: %v", err)
	}
	r := httptest.NewRequest("PUT", "http://localhost:4000/api/workspace", bytes.NewBuffer(workspacedat))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.WorkspaceUpdateHandler(w, r)

	resp := w.Result()
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		var message map[string]any
		if err := json.NewDecoder(resp.Body).Decode(&message); err != nil {
			log.Println(err)
			dat, err := io.ReadAll(resp.Body)
			if err != nil {
				log.Println(err)
			}
			log.Println(dat)
		} else {
			log.Println(message)
		}
		return fmt.Errorf("status code %v", resp.StatusCode)
	}
	return nil
}

func TestWorkspaceCreate(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatalf("workspace api create: %v\n", err)
	}

	if err = workspaceDelete(workspaceID); err != nil {
		t.Fatalf("workspace db delete: %v\n", err)
	}
}

func TestWorkspaceDelete(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatalf("workspace db create: %v\n", err)
	}

	if workspaceID == 0 {
		t.Fatal("workspace db create: workspace id is zero")
	}

	if err := workspaceDelete(workspaceID); err != nil {
		t.Fatalf("workspace api delete: %v\n", err)
	}
}

func TestWorkspaceUpdate(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatalf("workspace db create: %v\n", err)
	}

	if workspaceID == 0 {
		t.Fatal("workspace db create: workspace id is zero")
	}

	workspaceName2 := rand.Text()[:16]
	if err := workspaceApiUpdate(workspaceID, workspaceName2); err != nil {
		t.Fatalf("workspace api update: %v\n", err)
	}

	if err := workspaceDelete(workspaceID); err != nil {
		t.Fatalf("workspace db delete: %v\n", err)
	}
}
