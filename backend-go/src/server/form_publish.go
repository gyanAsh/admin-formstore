package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"slices"
	"time"

	"github.com/jackc/pgx/v5"
)

type FormElementType string

type ElementLabel struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type FormElementReq struct {
	SeqNum     int32          `json:"seq_num"`
	Label      ElementLabel   `json:"labels"`
	Type       string         `json:"type"`
	Properties map[string]any `json:"properties"`
	Required   bool           `json:"required"`
}

type PublishFormReq struct {
	FormID   int32            `json:"form_id"`
	Design   map[string]any   `json:"design"`
	Elements []FormElementReq `json:"elements"`
}

func validateSeqNumber(elements []FormElementReq) error {
	if len(elements) == 0 {
		return fmt.Errorf("empty array")
	}
	if len(elements) >= 1000 {
		return fmt.Errorf("out of bounds: max element count is 1000")
	}
	seqNumArray := make([]int32, 0)
	for _, el := range elements {
		if el.SeqNum < int32(1) {
			return fmt.Errorf("negative number")
		}
		seqNumArray = append(seqNumArray, el.SeqNum)
	}
	slices.Sort(seqNumArray)
	for i, x := range seqNumArray {
		if x < int32(i+1) {
			return fmt.Errorf("duplicate element: %d", x)
		} else if x > int32(i+1) {
			return fmt.Errorf("missing element: %d, next element: %d", i+1, x)
		}
	}
	return nil
}

func validatePublishFormReq(form PublishFormReq) (string, error) {
	if form.FormID <= 0 {
		return "form_id", fmt.Errorf("invalid form_id %d", form.FormID)
	}
	for _, el := range form.Elements {
		if el.Label.Title == "" {
			return "labels.title", fmt.Errorf("invalid form label title: %q, form element seq number: %v", el.Label.Title, el.SeqNum)
		}
		if el.Type != "website" &&
			el.Type != "consent" &&
			el.Type != "multiselect" &&
			el.Type != "dropdown" &&
			el.Type != "ranking" &&
			el.Type != "rating" &&
			el.Type != "date" &&
			el.Type != "text" &&
			el.Type != "phone" &&
			el.Type != "email" {
			return "type", fmt.Errorf("invalid form type: %q, form element seq number: %v", el.Type, el.SeqNum)
		}
	}
	return "", nil
}

func (s *Service) FormPublishHandler(w http.ResponseWriter, r *http.Request) {
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
	batch.Queue(`UPDATE forms SET design = $1 WHERE ID = $2`, form.Design, form.FormID)
	batch.Queue(`DELETE FROM form_elements WHERE form_id = $1`, form.FormID)
	for _, element := range form.Elements {
		batch.Queue(`INSERT INTO form_elements (type, label, seq_number,
			description, form_id, properties, required) VALUES
			($1, $2, $3, $4, $5, $6, $7)`,
			element.Type, element.Label.Title, element.SeqNum,
			element.Label.Description, form.FormID,
			element.Properties, element.Required)
	}
	batch.Queue(`UPDATE forms SET updated_at = $1`, time.Now().Format(time.RFC3339))
	br := s.Conn.SendBatch(r.Context(), batch)
	defer br.Close()

	// UPDATE forms
	_, err = br.Exec()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
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
	// UPDATE time
	_, err = br.Exec()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if _, err = s.Conn.Exec(r.Context(), `UPDATE forms SET status =
	'published' WHERE ID = $1`, form.FormID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err = json.NewEncoder(w).Encode(map[string]any{
		"message": "form successfull published",
	}); err != nil {
		log.Println(err)
	}
}
