package endpoints

import (
	"bytes"
	"context"
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

func formDbDelete(formID int) error {
	if _, err := s.Conn.Exec(context.Background(), `DELETE FROM forms
	WHERE ID = $1`, formID); err != nil {
		return fmt.Errorf("db delete query failed: %v", err)
	}
	return nil
}

func formDbCreate(workspaceID int, formTitle string) (int, error) {
	row := s.Conn.QueryRow(context.Background(), `INSERT INTO forms
		(title, workspace_id) VALUES ($1, $2) RETURNING ID`, formTitle, workspaceID)
	var formID int
	if err := row.Scan(&formID); err != nil {
		return 0, fmt.Errorf("db insert query failed: %v", err)
	}
	return formID, nil
}

func TestFormCreate(t *testing.T) {
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

func formApiDelete(formID int) error {
	r := httptest.NewRequest("DELETE", "http://localhost:4000/api/form", nil)
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
	formID, err := formDbCreate(workspaceID, formTitle)
	if err != nil {
		log.Println(fmt.Errorf("form db create: %v", err))
	}
	if err := formApiDelete(formID); err != nil {
		log.Println(fmt.Errorf("form api delete: %v", err))
	}
}
