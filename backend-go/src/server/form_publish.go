package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5"
)

type FormElementType string

type ElementLabel struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type FormElementReq struct {
	SeqNum int32        `json:"seq_num"`
	Label  ElementLabel `json:"labels"`
	Type   string       `json:"type"`
}

type PublishFormReq struct {
	FormID   int64            `json:"form_id"`
	Elements []FormElementReq `json:"elements"`
}

func (s *Service) formPushishHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var form PublishFormReq
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	row := s.Conn.QueryRow(r.Context(), `SELECT id FROM forms WHERE id = $1
	AND workspace_id IN (SELECT id FROM workspaces WHERE user_id = $2)`,
		form.FormID, userID)

	var dbUserIB int64
	if err = row.Scan(&dbUserIB); err != nil {
		log.Println(err)
		if err == pgx.ErrNoRows {
			w.WriteHeader(http.StatusForbidden)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}
	}
	batch := &pgx.Batch{}
	batch.Queue(`DELETE FROM form_elements WHERE form_id = $1`, form.FormID)
	for _, element := range form.Elements {
		batch.Queue(`INSERT INTO form_elements (element_type, label,
			description, form_id) VALUES ($1, $2, $3, $4)`,
			element.Type, element.Label.Title,
			element.Label.Description, form.FormID)
	}
	br := s.Conn.SendBatch(r.Context(), batch)
	defer br.Close()

	// DELETE
	_, err = br.Exec()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	for range form.Elements {
		// INSERT
		_, err = br.Exec()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"message": err.Error(),
			})
			return
		}
	}
	return
}
