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
	json.NewEncoder(w).Encode(map[string]any{
		"message": "form successfully submitted",
	})
	log.Println(rawData)
}
