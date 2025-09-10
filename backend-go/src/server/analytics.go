package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"local.formstore.admin/db"
)

type SubmissionElement struct {
	Value any `json:"value"`
}

type Submission struct {
	ID       int                 `json:"id"`
	Elements []SubmissionElement `json:"elements"`
}

func parseSubmission(dataDB []db.GetAnalyticsFormSubmissionsRow) []Submission {
	entries := make(map[int32][][]byte)
	for _, x := range dataDB {
		var val map[string]any
		err := json.Unmarshal(x.Data, &val)
		if err != nil {
			log.Printf("failed to parse json data with error: %v", err)
			continue
		}
		if entries[x.FormSubmissionID] == nil {
			entries[x.FormSubmissionID] = make([][]byte, 0)
		}
		entries[x.FormSubmissionID] = append(entries[x.FormSubmissionID], x.Data)
	}

	data := make([]Submission, 0)
	for key, val := range entries {
		elements := make([]SubmissionElement, 0)
		for _, sub := range val {
			var jsonSub map[string]any
			if err := json.Unmarshal(sub, &jsonSub); err != nil {
				log.Printf("json unmarshal submission entry error: %v", err)
				continue
			}
			elements = append(elements, SubmissionElement{
				Value: jsonSub["value"],
			})
		}
		data = append(data, Submission{
			ID:       int(key),
			Elements: elements,
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
	publicID, err := s.Queries.GetPublicIDForm(r.Context(), int32(formID))
	if err != nil {
		log.Println(fmt.Errorf("get public id: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if !publicID.Valid {
		log.Println(fmt.Errorf("public id: invalid uuid"))
		w.WriteHeader(http.StatusForbidden)
		return
	}
	submissionsDBData, err := s.Queries.GetAnalyticsFormSubmissions(r.Context(), db.GetAnalyticsFormSubmissionsParams{
		ID:   int32(formID),
		ID_2: userID,
	})
	submissions := parseSubmission(submissionsDBData)
	if err := json.NewEncoder(w).Encode(map[string]any{
		"submissions": submissions,
		"public_id":   publicID,
	}); err != nil {
		log.Println(fmt.Errorf("form analytics failed to write json: %v", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
