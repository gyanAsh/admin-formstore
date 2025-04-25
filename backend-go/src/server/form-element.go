package server

import (
	"encoding/json"
	"log"
	"net/http"
)

func (s *Service) formElementCreationHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if userID == 0 {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var formData map[string]string
	json.NewDecoder(r.Body).Decode(&formData)
	elementType := formData["element_type"]
	log.Println(elementType)
}
