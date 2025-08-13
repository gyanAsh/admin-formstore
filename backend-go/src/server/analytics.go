package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func (s *Service) FormAnalyticsDataHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := authenticate(r)
	if err != nil {
		log.Println(fmt.Errorf("form analytics auth error: %v", err))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	formID, err := strconv.Atoi(r.PathValue("form_id"))
	if err != nil {
		log.Println(fmt.Errorf("form analytics invalid form_id %v error: %v",
			r.PathValue("form_id"),
			err,
		))
		w.WriteHeader(http.StatusBadRequest)
		if err = json.NewEncoder(w).Encode(map[string]any{
			"message": "invalid value for form_id",
		}); err != nil {
			log.Println(fmt.Errorf("failed to write repsonse: %v", err))
		}
		return
	}
	rows, err := s.Conn.Query(r.Context(), `
		SELECT submission_entries.ID, data FROM submission_entries
		INNER JOIN form_submissions ON form_submission_id = form_submissions.ID
		WHERE form_id = $1
	`, formID)
	if err != nil {
		log.Println(fmt.Errorf("form analytics database query: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var submissions []map[string]any
	for rows.Next() {
		var sbID int32
		var sbData string
		rows.Scan(&sbID, &sbData)
		submissions = append(submissions, map[string]any{
			"id":   sbID,
			"data": sbData,
		})
	}
	if err := json.NewEncoder(w).Encode(map[string]any{
		"submissions": submissions,
	}); err != nil {
		log.Println(fmt.Errorf("form analytics failed to write json: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
