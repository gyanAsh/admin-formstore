package server

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

func generateAuthToken(userID int64, signedSecret []byte) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
	})
	tokenString, err := token.SignedString(signedSecret)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func parseAuthToken(tokenString string, signedSecret []byte) (int64, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return signedSecret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil {
		return 0, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		userID_f, ok := claims["user_id"].(float64)
		if !ok {
			fmt.Errorf("failed to parse claims with Error: failed to parse user_id to float64")
		}
		return int64(userID_f), nil
	}
	return 0, fmt.Errorf("failed to parse claims")
}
