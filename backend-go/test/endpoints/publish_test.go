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

func TestPublishForm(t *testing.T) {
	workspaceName := rand.Text()[:12]
	workspaceID, err := workspaceCreate(workspaceName)
	if err != nil {
		t.Fatal(fmt.Errorf("workspace create: %v", err))
	}
	defer (func(workspaceID int) {
		if err := workspaceDelete(workspaceID); err != nil {
			t.Fatal(fmt.Errorf("workspace delete: %v", err))
		}
	})(workspaceID)

	formTitle := rand.Text()[:12]
	formID, err := formCreate(workspaceID, formTitle)
	if err != nil {
		log.Println(fmt.Errorf("form db create: %v", err))
	}
	defer (func(formID int) {
		if err := formDelete(formID); err != nil {
			log.Println(fmt.Errorf("form api delete: %v", err))
		}
	})(formID)

	requestBody, err := json.Marshal(map[string]any{
		"form_id": formID,
		"design": map[string]any{
			"design_field1": "design_data",
		},
		"elements": []map[string]any{
			{"seq_num": 1, "label": "enter your email", "type": "email", "properties": map[string]any{}, "required": true},
			{"seq_num": 2, "label": "enter your backup email", "type": "email", "properties": map[string]any{}, "required": false},
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	r := httptest.NewRequest("POST", "http://localhost:4000/api/form/publish", bytes.NewBuffer(requestBody))
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %v", AUTH_TOKEN))
	w := httptest.NewRecorder()

	s.FormPublishHandler(w, r)
	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Fatal(fmt.Errorf("resp: %v %v", resp.Status, resp.Body))
	}
	var data map[string]any
	if err = json.NewDecoder(resp.Body).Decode(&data); err != nil {
		t.Fatal(fmt.Errorf("json decode: publish body: %v", err))
	}
	publicID_s, ok := data["public_id"].(string)
	if !ok {
		t.Fatal(fmt.Errorf("public_id not found in response body"))
	}
	r = httptest.NewRequest("GET", "http://localhost:4000/api/published/form/{public_id}", nil)
	r.SetPathValue("public_id", publicID_s)
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w = httptest.NewRecorder()

	s.PublishedFormDataHandler(w, r)

	resp = w.Result()

	if resp.StatusCode != 200 {
		t.Fatal(fmt.Errorf("resp: %v", resp.Status))
	}
	if err = json.NewDecoder(resp.Body).Decode(&data); err != nil {
		t.Fatal(fmt.Errorf("json decode: get published form %v", err))
	}
}
