package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/jackc/pgx/v5"
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
	if err = json.NewDecoder(r.Body).Decode(&formData); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid json"))
		return
	}
	log.Println(formData)
	elementType := formData["element_type"]
	formID, err := strconv.ParseInt(formData["form_id"], 10, 64)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	row := s.Conn.QueryRow(r.Context(), `SELECT user_id from forms WHERE form_id = $1`, formID)
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

	row = s.Conn.QueryRow(r.Context(), `INSERT INTO form_elements (element_type,
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

func (s *Service) formElementUpdateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var element FormElement
	if err = json.NewDecoder(r.Body).Decode(&element); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid json"))
		return
	}

	row := s.Conn.QueryRow(r.Context(), `
		SELECT
			workspaces.user_id
		FROM
			form_elements
		INNER JOIN
			forms
		ON
			form_elements.form_id = forms.ID
		INNER JOIN
			workspaces
		ON
			forms.workspace_id = workspaces.ID
		WHERE
			form_elements.ID = $1
		AND
			workspaces.user_id = $2
		`, element.ID, userID)

	var dbUserID int64
	if err = row.Scan(&dbUserID); err != nil {
		log.Println(err)
		if err == pgx.ErrNoRows {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	_, err = s.Conn.Exec(r.Context(), `
		UPDATE form_elements SET label = $1 WHERE ID = $2 AND element_type = $3
		`, element.Label, element.ID, element.Type)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
