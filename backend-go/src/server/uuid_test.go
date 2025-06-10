package server

import (
	"encoding/hex"
	"strings"
	"testing"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/stretchr/testify/require"
)

func TestUUIDEncoding(t *testing.T) {
	assert := require.New(t)
	userID := "c9b0aac1-f184-439d-a09d-64c0b1cd644b"
	userIDc := strings.ReplaceAll(userID, "-", "")

	userIDa, err := hex.DecodeString(userIDc)
	if err != nil {
		t.Fatal(err)
	}
	userID_uuid := pgtype.UUID{Bytes: [16]byte(userIDa), Valid: true}
	assert.Equal(userID, userID_uuid.String())
}
