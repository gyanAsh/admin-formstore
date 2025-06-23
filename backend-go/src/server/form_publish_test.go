package server

import (
	"encoding/json"
	"fmt"
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

	assert.Equal(formData.FormID, int32(1))
	assert.Equal(len(formData.Elements), 3)
}

func TestValidateSeqNumber(t *testing.T) {
	var elements []FormElementReq
	var err error

	// check correct orderded
	elements = []FormElementReq{
		{SeqNum: 1},
		{SeqNum: 2},
		{SeqNum: 3},
		{SeqNum: 4},
	}
	err = validateSeqNumber(elements)
	if err != nil {
		t.Fatal(fmt.Errorf("validation seq number: %q", err))
	}

	// check correct unordered
	elements = []FormElementReq{
		{SeqNum: 1},
		{SeqNum: 3},
		{SeqNum: 4},
		{SeqNum: 2},
	}
	err = validateSeqNumber(elements)
	if err != nil {
		t.Fatal(fmt.Errorf("validation seq number: %q", err))
	}

	// check incorrect missing
	elements = []FormElementReq{
		{SeqNum: 1},
		{SeqNum: 3},
		{SeqNum: 4},
	}
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: incorrect missing"))
	}

	// check incorect wrong starting orderd
	elements = []FormElementReq{
		{SeqNum: 0},
		{SeqNum: 1},
		{SeqNum: 2},
	}
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: incorrect starting point"))
	}

	// check incorrect negative
	elements = []FormElementReq{
		{SeqNum: 1},
		{SeqNum: 2},
		{SeqNum: 3},
		{SeqNum: -4},
	}
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: incorrect missing"))
	}

	// check incorrect duplicate
	elements = []FormElementReq{
		{SeqNum: 1},
		{SeqNum: 1},
		{SeqNum: 2},
		{SeqNum: 3},
	}
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: incorect duplicate elements"))
	}

	// check incorrect duplicate end
	elements = []FormElementReq{
		{SeqNum: 1},
		{SeqNum: 2},
		{SeqNum: 3},
		{SeqNum: 3},
	}
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: incorrect duplicate at the end"))
	}

	// no elements
	elements = make([]FormElementReq, 0)
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: no elements"))
	}

	// check incorrect out of bounds
	for i := range 1500 {
		elements = append(elements, FormElementReq{SeqNum: int32(i + 1)})
	}
	err = validateSeqNumber(elements)
	if err == nil {
		t.Fatal(fmt.Errorf("validation seq number test failed: out of bounds"))
	}
}
