package server

import (
	"log"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParseFormData(t *testing.T) {
	assert := require.New(t)

	rows := []RowFormData{}
	_, err := parseFormData(rows)
	assert.NotNil(err)
	rows = append(rows, RowFormData{
		FormID: 2,
	})
	rowData, err := parseFormData(rows)
	log.Println(rowData)
	assert.NotNil(err)
}
