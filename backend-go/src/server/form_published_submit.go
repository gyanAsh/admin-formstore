package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type SubmitElement struct {
	SeqNo int    `json:"seq_number"`
	Type  string `json:"type"`
	Value any    `json:"value"`
}

type SubmitForm struct {
	PublicID string          `json:"public_id"`
	Elements []SubmitElement `json:"elements"`
}

func (s *Service) PublishedFormSubmitHandler(w http.ResponseWriter, r *http.Request) {
	var formData SubmitForm
	if err := json.NewDecoder(r.Body).Decode(&formData); err != nil {
		log.Println(fmt.Errorf("json decoding form body %v", err))
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]any{
			"message": "json body required",
		}); err != nil {
			log.Println(fmt.Errorf("json encoding error %v", err))
			return
		}
		return
	}
	if formData.PublicID == "" {
		log.Println(fmt.Errorf("form submit: missing field: public_id"))
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]any{
			"message": "required field: public_id missing",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	row := s.Conn.QueryRow(r.Context(), `
		INSERT INTO form_submissions (form_id)
		SELECT ID FROM forms
		WHERE public_id = $1 AND status = 'published' 
		RETURNING ID`, formData.PublicID)
	var submissionID int
	if err := row.Scan(&submissionID); err != nil {
		log.Println(fmt.Errorf("submit form db insert query: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	for _, element := range formData.Elements {
		_, err := s.Conn.Exec(r.Context(), `
			INSERT INTO submission_entries (form_submission_id, element_id, data)
			VALUES (
				$1,
				(SELECT ID FROM form_elements
				WHERE form_id = (SELECT ID FROM forms WHERE public_id = $2 AND seq_number = $3)),
				$4
			)`, submissionID, formData.PublicID, element.SeqNo, map[string]any{"value": element.Value})
		if err != nil {
			log.Printf("failed to insert submission entry with error: %v", err)
		}
		if err = json.NewEncoder(w).Encode(map[string]any{
			"message": "form successfully submitted",
		}); err != nil {
			log.Println(fmt.Errorf("json encoding success message failed: %v", err))
			return
		}
	}
}
