package server

import "testing"

func TestCreateAndParseToken(t *testing.T) {
	userID := "c9b0aac1-f184-439d-a09d-64c0b1cd644b"
	signedSecret := []byte("sample secret")
	tokenString, err := generateAuthToken(userID, signedSecret)
	if err != nil {
		t.Fatal(err)
	}
	parsedUserID, err := parseAuthToken(tokenString, signedSecret)
	if err != nil {
		t.Fatal(err)
	}
	if userID != parsedUserID {
		t.Fatal("orignal value and parse values don't match", userID, parsedUserID)
	}
}
