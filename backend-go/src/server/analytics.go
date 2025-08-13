package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"local.formstore.admin/db"
)

type Submission struct {
	ID int32 `json:"id"`
	Data string `json:"data"`
}

func parseSubmission(dataDB []db.GetAnalyticsFormSubmissionsRow) []Submission {
	var data []Submission
	for _, x := range dataDB {
		data = append(data, Submission {
			ID: x.ID,
			Data: x.Data,
		})
	}
	return data
}

func (s *Service) FormAnalyticsDataHandler(w http.ResponseWriter, r *http.Request) {
	userID_s, err := s.authenticate(r)
	if err != nil {
		log.Println(fmt.Errorf("form analytics auth error: %v", err))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	userID, err := ParsePgUUID(userID_s)
	if err != nil {
		log.Println(fmt.Errorf("form analytics user id error: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
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
	submissionsDBData, err := s.Queries.GetAnalyticsFormSubmissions(r.Context(), db.GetAnalyticsFormSubmissionsParams{
		ID: int32(formID),
		ID_2: userID,
	})
	submissions := parseSubmission(submissionsDBData)
	if err := json.NewEncoder(w).Encode(map[string]any{
		"submissions": submissions,
	}); err != nil {
		log.Println(fmt.Errorf("form analytics failed to write json: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
