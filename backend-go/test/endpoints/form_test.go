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

func formCreate(workspace_id int, title string) (int, error) {
	formData, err := json.Marshal(map[string]any{
		"workspace_id": workspace_id,
		"title":        title,
	})
	if err != nil {
		return 0, fmt.Errorf("form data json request object error: %v\n", err)
	}

	r := httptest.NewRequest("POST", "http://localhost:4000/api/form", bytes.NewBuffer(formData))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %v", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.FormCreateHandler(w, r)

	resp := w.Result()
	var respBody map[string]any
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		if err := json.NewDecoder(resp.Body).Decode(&respBody); err != nil {
			return 0, fmt.Errorf("incorrect status code: %d with body: %v", resp.StatusCode, respBody)
		} else {
			log.Println(err)
			respBodyText, err := io.ReadAll(resp.Body)
			if err != nil {
				return 0, fmt.Errorf("incorrect status code: %d with body: %v", resp.StatusCode, string(respBodyText))
			} else {
				return 0, fmt.Errorf("incorrect status code: %d with no body", resp.StatusCode)
			}
		}
	}
	if err := json.NewDecoder(resp.Body).Decode(&respBody); err != nil {
		return 0, fmt.Errorf("json decode after success: %v", err)
	}
	if formID_f, ok := respBody["id"].(float64); !ok {
		return 0, fmt.Errorf("form id not found in response body: %v", respBody)
	} else {
		return int(formID_f), nil
	}
}

func TestFormCreate(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatal(fmt.Errorf("workspace db create: %v", err))
	}
	defer func(workspaceID int) {
		if err := workspaceDelete(workspaceID); err != nil {
			t.Fatal(fmt.Errorf("workspace delete: %v", err))
		}
	}(workspaceID)

	formTitle := rand.Text()[:12]
	if formID, err := formCreate(workspaceID, formTitle); err != nil {
		t.Fatal(fmt.Errorf("form api create: %v", err))
		if formID == 0 {
			t.Fatal("form id is 0")
		}
	}
}

func formDelete(formID int) error {
	r := httptest.NewRequest("DELETE", "http://localhost:4000/api/form/{form_id}", nil)
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	r.SetPathValue("form_id", fmt.Sprint(formID))
	w := httptest.NewRecorder()

	resp := w.Result()
	if resp.StatusCode != 200 {
		var message map[string]any
		if err := json.NewDecoder(resp.Body).Decode(&message); err != nil {
			log.Println(fmt.Errorf("json decoding: %v", err))
			if data, err := io.ReadAll(resp.Body); err != nil {
				log.Println(fmt.Errorf("text decoding: %v", err))
				log.Println("no body found")
			} else {
				log.Println("message data: ", string(data))
			}
		} else {
			log.Println("message data: ", message)
		}
		return fmt.Errorf("invalid status code = %d\n", resp.StatusCode)
	}
	return nil
}

func TestFormDelete(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatal(fmt.Errorf("workspace db create: %v", err))
	}
	defer func(workspaceID int) {
		if err := workspaceDelete(workspaceID); err != nil {
			t.Fatal(fmt.Errorf("workspace delete: %v", err))
		}
	}(workspaceID)

	formTitle := rand.Text()[:12]
	formID, err := formCreate(workspaceID, formTitle)
	if err != nil {
		log.Println(fmt.Errorf("form db create: %v", err))
	}
	if err := formDelete(formID); err != nil {
		log.Println(fmt.Errorf("form api delete: %v", err))
	}
}
