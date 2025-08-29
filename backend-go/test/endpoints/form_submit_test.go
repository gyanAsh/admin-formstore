package endpoints

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http/httptest"
	"testing"
)

func TestPublishedFormSubmit(t *testing.T) {
	formExampleData, err := json.Marshal(map[string]any{
		"seq_number": 1,
		"type": "website",
		"value": "http://localhost",
	})
	if err != nil {
		log.Println(fmt.Errorf("encoding json data submit form error: %v", err))
	}
	r := httptest.NewRequest("POST", "http://localhost:4000/api/published/submit", bytes.NewBuffer(formExampleData))
	w := httptest.NewRecorder()

	s.PublishedFormSubmitHandler(w, r)

	resp := w.Result()

	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		var errorMessage map[string]any
		if err := json.NewDecoder(resp.Body).Decode(&errorMessage); err != nil {
			log.Println(fmt.Errorf("json decoding error: %v", err))
		}
		log.Println(fmt.Errorf("error message: %v", errorMessage))
	}
}
