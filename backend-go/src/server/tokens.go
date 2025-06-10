package server

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

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
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		userID, ok := claims["user_id"].(string)
		if !ok {
			return "", fmt.Errorf("failed to parse claims with Error: failed to parse user_id to string")
		}
		return userID, nil
	}
	return "", fmt.Errorf("failed to parse claims")
}
