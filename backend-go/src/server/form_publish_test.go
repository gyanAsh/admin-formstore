package server

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPublishFormJson(t *testing.T) {
	req_data := map[string]any{
		"form_id": 1,
		"elements": []map[string]any{
			{
				"seq_num": 1,
				"label": map[string]any{
					"title":       "Email",
					"description": "please enter your personal email",
				},
				"type": "email",
			},
			{
				"seq_num": 2,
				"label": map[string]any{
					"title":       "Phone",
					"description": "please enter your personal phone number",
				},
				"type": "phone",
			},
			{
				"seq_num": 3,
				"label": map[string]any{
					"title":       "Address",
					"description": "please enter your address",
				},
				"type": "address",
			},
		},
	}
	data, err := json.Marshal(req_data)
	if err != nil {
		t.Fatal(err)
	}
	var formData PublishFormReq
	if err = json.Unmarshal(data, &formData); err != nil {
		t.Fatal(err)
	}

	assert := require.New(t)

	assert.Equal(formData.FormID, int64(1))
	assert.Equal(len(formData.Elements), 3)
}
