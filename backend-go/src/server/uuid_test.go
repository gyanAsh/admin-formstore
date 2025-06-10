package server

import (
	"encoding/hex"
	"fmt"
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

func TestCheckValidUUID(t *testing.T) {
	var err error
	// correct
	userID := "c9b0aac1-f184-439d-a09d-64c0b1cd644b"
	err = checkValidUUID(userID)
	if err != nil {
		t.Fatal(fmt.Errorf("Parsing correct failed with error: %q", err))
	}
	// 1 value missing
	userID = "c9b0aa1-f184-439d-a09d-64c0b1cd644b"
	err = checkValidUUID(userID)
	if err == nil {
		t.Fatal(fmt.Errorf("Parsed invalid uuid: length short"))
	}
	userID = "c9b0aac1f184-439d-a09d-64c0b1cd644b"
	err = checkValidUUID(userID)
	if err == nil {
		t.Fatal(fmt.Errorf("Parsed invalid uuid: missing hyphen"))
	}
}
