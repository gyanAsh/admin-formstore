package endpoints

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http/httptest"
	"strconv"
	"testing"

	"local.formstore.admin/src/server"
)

func getWorkspaces() ([]int, error) {
	r := httptest.NewRequest("GET", "http://localhost:4000/api/workspaces", nil)
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	w := httptest.NewRecorder()
	s.WorkspacesHandler(w, r)
	resp := w.Result()
	if resp.StatusCode != 200 {
		responseBody, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("failed to decode response body with error: %v", err)
		}
		return []int{}, fmt.Errorf("failed to get workspaces list, status: %v, body: %v", resp.Status, string(responseBody))
	}

	var workspaces []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&workspaces); err != nil {
		return []int{}, fmt.Errorf("failed to decode response body")
	}
	var workspaceIDs []int
	for _, workspace := range workspaces {
		workspaceID_f, ok := workspace["id"].(float64)
		if !ok {
			return []int{}, fmt.Errorf("failed to decode workspace id: %v", workspace["id"])
		}
		workspaceID := int(workspaceID_f)
		workspaceIDs = append(workspaceIDs, workspaceID)
	}
	return workspaceIDs, nil
}

func getPublishedForms() ([]int, error) {
	workspaceIDs, err := getWorkspaces()
	if err != nil {
		return []int{}, fmt.Errorf("failed to get workspaces: %v", err)
	}

	type WorkspaceAndForms struct {
		Forms     []server.Form    `json:"forms"`
		Workspace server.Workspace `json:"workspace"`
	}
	var data WorkspaceAndForms

	var publishedFormIDs []int
	for _, workspaceID := range workspaceIDs {
		r := httptest.NewRequest("GET", "http://localhost:4000/api/workspace/{workspace_id}", nil)
		r.SetPathValue("workspace_id", strconv.Itoa(workspaceID))
		r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
		w := httptest.NewRecorder()
		s.FormsHandler(w, r)
		resp := w.Result()
		if resp.StatusCode != 200 {
			responseBody, err := io.ReadAll(resp.Body)
			if err != nil {
				log.Printf("failed to decode response body with error: %v", err)
			}
			return []int{}, fmt.Errorf("failed to get workspace data, status: %v, body: %v", resp.Status, string(responseBody))
		}
		if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
			return []int{}, fmt.Errorf("failed to decode forms and workspace response")
		}
		for _, form := range data.Forms {
			if form.Status == "published" {
				publishedFormIDs = append(publishedFormIDs, int(form.ID))
			}
		}
	}

	return publishedFormIDs, nil
}

func TestAnalyticsPage(t *testing.T) {
	formIDs, err := getPublishedForms()
	if err != nil {
		t.Fatalf("failed to get past forms with error: %v", err)
	}
	if len(formIDs) == 0 {
		// TODO: handle case for create new submission entries
		t.Fatalf("incomplete testing function")
	}
	formID := formIDs[0]

	r := httptest.NewRequest("GET", "http://localhost:4000/api/analytics/{form_id}", nil)
	r.Header.Add("Authorization", fmt.Sprintf("Bearer %s", AUTH_TOKEN))
	r.SetPathValue("form_id", strconv.Itoa(formID))
	w := httptest.NewRecorder()
	s.FormAnalyticsDataHandler(w, r)
	resp := w.Result()

	if resp.StatusCode != 200 {
		responseBody, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("failed to decode response body: %v", err)
		}
		t.Fatalf("failed to get analytics data, status: %v, body: %v", resp.Status, responseBody)
	}

	var data map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		t.Fatalf("failed to decode response body: %v", err)
	}
	t.Fatalf("fix the analytis function, data: %v", data)
}
