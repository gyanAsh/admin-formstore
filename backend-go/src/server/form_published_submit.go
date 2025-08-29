package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type FormSubmitData struct {
	PublicID string `json:"public_id"`
	SeqNo    int    `json:"seq_number"`
	Type     string `json:"type"`
	Value    string `json:"value"`
}

func (s *Service) PublishedFormSubmitHandler(w http.ResponseWriter, r *http.Request) {
	var formData FormSubmitData
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
	if _, err := s.Conn.Exec(r.Context(), `
		INSERT INTO form_submissions (form_id)
		SELECT ID FROM forms
		WHERE public_id = $1 AND status = 'published'`, formData.PublicID); err != nil {
		log.Println(fmt.Errorf("submit form db insert query: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(map[string]any{
		"message": "form successfully submitted",
	}); err != nil {
		log.Println(fmt.Errorf("json encoding success message failed: %v", err))
		return
	}
	log.Println(formData)
}
