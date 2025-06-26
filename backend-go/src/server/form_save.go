package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"local.formstore.admin/db"
)

func parseFormElementRowsBatched(form PublishFormReq) ([]db.AddFormElementsBatchedParams, error) {
	rowArgs := []db.AddFormElementsBatchedParams{}
	for _, el := range form.Elements {
		var formElementType db.FormElementTypes
		if err := formElementType.Scan(el.Type); err != nil {
			return []db.AddFormElementsBatchedParams{}, fmt.Errorf("form element type: %v", err)
		}
		formElementProperties, err := json.Marshal(el.Properties)
		if err != nil {
			return []db.AddFormElementsBatchedParams{}, fmt.Errorf("json marshal form element properties: %v", err)
		}
		formElement := db.AddFormElementsBatchedParams{
			Type:        formElementType,
			Label:       pgtype.Text{String: el.Label.Title, Valid: true},
			SeqNumber:   el.SeqNum,
			Description: pgtype.Text{String: el.Label.Description, Valid: true},
			FormID:      int32(form.FormID),
			Properties:  formElementProperties,
			Required:    el.Required,
		}
		rowArgs = append(rowArgs, formElement)
	}
	return rowArgs, nil
}

// The save function also uses the PublishFormReq object as the same data is
// being saved
func (s *Service) formSaveHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := s.authenticate(r)
	if err != nil {
		log.Println(fmt.Errorf("authentication: %v", err))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var form PublishFormReq
	err = json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		log.Println(fmt.Errorf("json decoding request body: %v", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := validateSeqNumber(form.Elements); err != nil {
		log.Println(fmt.Errorf("save form validate seq number: %v", err))
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]any{
			"key":     "seq_num",
			"message": "sequence number validation failed",
		}); err != nil {
			log.Println(fmt.Errorf("json write: %v", err))
		}
	}
	if key, err := validatePublishFormReq(form); err != nil {
		log.Println(fmt.Errorf("save form validate req: %v", err))
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]any{
			"key":     key,
			"message": "validation failed",
		}); err != nil {
			log.Println(fmt.Errorf("json write: %v", err))
		}
	}

	userIDb, err := convertUUIDStringToBin(userID)
	if err != nil {
		log.Println(fmt.Errorf("covert uuid string to bin: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	dbFormID, err := s.Queries.CheckFormAccess(r.Context(), db.CheckFormAccessParams{
		ID:     int32(form.FormID),
		UserID: pgtype.UUID{Bytes: userIDb, Valid: true},
	})
	if err != nil {
		log.Println(fmt.Errorf("check user access for form: %v", err))
		if err == pgx.ErrNoRows {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if dbFormID != int32(form.FormID) {
		log.Println(fmt.Errorf("form id from data and request don't match"))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	rowArgs, err := parseFormElementRowsBatched(form)
	if err != nil {
		log.Println(fmt.Errorf("parsing form element rows batched: %v", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tx, err := s.Conn.Begin(r.Context())
	if err != nil {
		log.Println(fmt.Errorf("transaction begin: %v", err))
		return
	}
	defer tx.Rollback(r.Context())

	queries := s.Queries.WithTx(tx)

	formDesignData, err := json.Marshal(form.Design)
	if err != nil {
		log.Println(fmt.Errorf("form design json marshal: %v", err))
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]any{
			"message": "failed to parse design data",
			"element": "design",
		})
		return
	}
	queries.UpdateFormDesign(r.Context(), db.UpdateFormDesignParams{
		ID:     int32(form.FormID),
		Design: formDesignData,
	})

	queries.DeleteFormElements(r.Context(), int32(form.FormID))
	br := queries.AddFormElementsBatched(r.Context(), rowArgs)

	br.Exec(func(t int, err error) {
		if err != nil {
			log.Println(fmt.Errorf("add form element query batchexec: %d, %v", t, err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	})

	if err = tx.Commit(r.Context()); err != nil {
		log.Println(fmt.Errorf("transaction commit: %v", err))
	}

	if err = json.NewEncoder(w).Encode(map[string]any{
		"message": "form saved successfully",
	}); err != nil {
		log.Println(fmt.Errorf("json write: %v", err))
	}
}
