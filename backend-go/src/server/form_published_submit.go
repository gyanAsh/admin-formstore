package server

import (
	"encoding/json"
	"log"
	"fmt"
	"net/http"
)

func (s *Service) PublishedFormSubmitHandler(w http.ResponseWriter, r *http.Request) {
	var rawData []map[string]any
	if err := json.NewDecoder(r.Body).Decode(&rawData); err != nil {
		log.Println(fmt.Errorf("json decoding form body %v", err))
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]any {
			"message": "json body required",
		}); err != nil {
			log.Println(fmt.Errorf("json encoding error %v", err))
			return
		}
		return
	}
	publicID := "placeholderpublicid"
	if _, err := s.Conn.Exec(r.Context(), `
		INSERT INTO form_submissions (form_id)
		SELECT ID FROM forms
		WHERE public_id = $1 AND status = 'published'`, publicID); err != nil {
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
	log.Println(rawData)
}


