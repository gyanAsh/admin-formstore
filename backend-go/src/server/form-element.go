package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
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
	log.Println(formData)
	elementType := formData["element_type"]
	formID, err := strconv.ParseInt(formData["form_id"], 10, 64)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	row := s.DB.QueryRow(r.Context(), `SELECT user_id from forms WHERE form_id = $1`, formID)
	var dbUserID int64
	if err = row.Scan(&dbUserID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusForbidden)
		return
	}
	if dbUserID != formID {
		log.Println(fmt.Errorf("user IDs don't match"))
		w.WriteHeader(http.StatusForbidden)
		return
	}

	row = s.DB.QueryRow(r.Context(), `INSERT INTO form_elements (element_type,
		form_id) VALUES ($1, $2) RETURNING ID`,
		elementType, formID)
	var formElementID int64
	if err = row.Scan(&formElementID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	return
}
