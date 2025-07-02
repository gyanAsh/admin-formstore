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

func TestConvertUUIDStringToBin(t *testing.T) {
	assert := require.New(t)
	orig := "c9b0aac1-f184-439d-a09d-64c0b1cd644b"
	data, err := convertUUIDStringToBin(orig)
	if err != nil {
		t.Fatal(err)
	}
	ref := [16]byte{201, 176, 170, 193, 241, 132, 67, 157, 160, 157, 100, 192, 177, 205, 100, 75}
	assert.Equal(data, ref)
}

func FuzzConvertUUIDStringToBin(f *testing.F) {
	f.Fuzz(func(t *testing.T, data string) {
		if _, err := convertUUIDStringToBin(data); err != nil {
			t.Fatalf("fuzz convert uuid string to bin: %v for data: %v", err, data)
		}
	})
}
