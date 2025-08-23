package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"local.formstore.admin/db"
)

type PublishedFormData struct {
	Form         Form          `json:"form"`
	FormElements []FormElement `json:"elements"`
}

func parseFormDataPublished(rows []db.GetFormDataPublicRow) (PublishedFormData, error) {
	var formData PublishedFormData
	formData.FormElements = []FormElement{}
	if len(rows) == 0 {
		return formData, fmt.Errorf("no rows")
	}
	for i, row := range rows {
		if row.ID == 0 {
			return formData, fmt.Errorf("invalid form id returnd")
		}
		if i == 0 {
			var form Form
			form.ID = int64(row.ID)
			form.Title = row.Title
			form.CreatedAt = row.CreatedAt.Time
			form.UpdatedAt = row.UpdatedAt.Time
			form.Status = string(row.Status)
			if err := json.Unmarshal(row.Design, &form.Design); err != nil {
				log.Println(fmt.Errorf("form desgin json:  %v", err))
			}
			formData.Form = form
		}

		var element FormElement
		element.SeqNumber = row.SeqNumber
		element.Type = string(row.Type)
		element.Label = row.Label.String
		element.Description = row.Description.String
		if err := json.Unmarshal(row.Properties, &element.Properties); err != nil {
			log.Println(fmt.Errorf("json unmarshel: %v", err))
		}
		element.Required = row.Required
		formData.FormElements = append(formData.FormElements, element)
	}
	return formData, nil
}

func (s *Service) PublishedFormDataHandler(w http.ResponseWriter, r *http.Request) {
	publicID, err := ParsePgUUID(r.PathValue("public_id"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid form id"))
		log.Println(fmt.Errorf("form id error: %v", err))
		return
	}
	rows, err := s.Queries.GetFormDataPublic(r.Context(), publicID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(fmt.Errorf("query failed: %v", err))
		return
	}
	formData, err := parseFormDataPublished(rows)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Println(fmt.Errorf("parsing form failed: %v", err))
		return
	}
	if err = json.NewEncoder(w).Encode(formData); err != nil {
		log.Println(fmt.Errorf("json write: %v", err))
	}
}
