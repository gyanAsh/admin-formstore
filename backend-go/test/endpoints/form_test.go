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

func formApiCreate(workspace_id int, title string) error {
	formData, err := json.Marshal(map[string]any{
		"workspace_id": workspace_id,
		"title":        title,
	})
	if err != nil {
		return fmt.Errorf("form data json request object error: %v\n", err)
	}

	r := httptest.NewRequest("POST", "http://localhost:4000/api/form", bytes.NewBuffer(formData))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %v", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.FormCreateHandler(w, r)

	resp := w.Result()
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		var ret map[string]string
		if err := json.NewDecoder(resp.Body).Decode(&ret); err != nil {
			return fmt.Errorf("incorrect status code: %d with body: %v", resp.StatusCode, ret)
		} else {
			log.Println(err)
			ret2, err := io.ReadAll(resp.Body)
			if err != nil {
				return fmt.Errorf("incorrect status code: %d with body: %v", resp.StatusCode, string(ret2))
			} else {
				return fmt.Errorf("incorrect status code: %d with no body", resp.StatusCode)
			}
		}
	}
	return nil
}

func formDbDelete() {
}

func TestCreateForm(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceDbCreate(workspaceName)
	if err != nil {
		t.Fatal(fmt.Errorf("workspace db create: %v", err))
	}
	defer func(workspaceID int) {
		if err := workspaceDbDelete(workspaceID); err != nil {
			t.Fatal(fmt.Errorf("workspace delete: %v", err))
		}
	}(workspaceID)

	formTitle := rand.Text()[:12]
	if err := formApiCreate(workspaceID, formTitle); err != nil {
		t.Fatal(fmt.Errorf("form api create: %v", err))
	}
}
