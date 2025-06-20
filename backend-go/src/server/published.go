package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"local.formstore.admin/db"
)

type PublishedFormData struct {
	Form         Form          `json:"form"`
	FormElements []FormElement `json:"form_elements"`
}

func parseFormDataPublished(rows []db.GetFormDataPublicRow) PublishedFormData {
	var formData PublishedFormData
	formData.FormElements = []FormElement{}
	for i, row := range rows {
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
		formData.FormElements = append(formData.FormElements, element)
	}
	return formData
}

func (s *Service) publishedFormDataHandler(w http.ResponseWriter, r *http.Request) {
	formID, err := strconv.Atoi(r.PathValue("form_id"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid form id"))
		log.Println(fmt.Errorf("form id error: %v", err))
		return
	}
	rows, err := s.Queries.GetFormDataPublic(r.Context(), int32(formID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(fmt.Errorf("query failed: %v", err))
		return
	}
	formData := parseFormDataPublished(rows)
	if err = json.NewEncoder(w).Encode(formData); err != nil {
		log.Println(fmt.Errorf("json write: %v", err))
	}
}
