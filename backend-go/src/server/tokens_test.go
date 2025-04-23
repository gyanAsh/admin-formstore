package server

import "testing"

func TestCreateAndParseToken(t *testing.T) {
	var userID int64 = 11224431
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
