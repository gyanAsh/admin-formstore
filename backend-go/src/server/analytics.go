package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func (s *Service) FormAnalyticsDataHandler(w http.ResponseWriter, r *http.Request) {
	rows, err := s.Conn.Query(r.Context(), `
		SELECT ID, data FROM submission_entries
	`)
	if err != nil {
		log.Println(fmt.Errorf("form analytics database query: %v", err))
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
	}
}
