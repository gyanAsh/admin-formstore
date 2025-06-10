package server

import (
	"encoding/hex"
	"fmt"
	"regexp"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func checkValidUUID(uuid_str string) error {
	var err error
	_, err = hex.DecodeString(strings.ReplaceAll(uuid_str, "-", ""))
	if err != nil {
		return fmt.Errorf("Failed to decode uuid string with error: %q", err)
	}
	re, err := regexp.Compile("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
	if err != nil {
		return err
	}
	if !re.MatchString(uuid_str) {
		return fmt.Errorf("Validation failed: user id - uuid match failed")
	}
	return nil
}

func generateAuthToken(userID string, signedSecret []byte) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
	})
	tokenString, err := token.SignedString(signedSecret)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func parseAuthToken(tokenString string, signedSecret []byte) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return signedSecret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("failed to parse claims with Error: failed to parse user_id to string")
	}
	userID, ok := claims["user_id"].(string)
	if err = checkValidUUID(userID); err != nil {
		return "", err
	}
	return userID, nil
}
