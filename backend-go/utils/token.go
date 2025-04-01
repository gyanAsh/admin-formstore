package utils

import (
	"backend-formstore/config" // Update with your module name
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(config.AppConfig.JWTSecretKey)

// Claims defines the structure of the JWT claims
type Claims struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// GenerateJWT creates a new JWT token for a given user
func GenerateJWT(userID int, username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Token valid for 24 hours
	claims := &Claims{
		UserID:   userID,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "your-app-name", // Optional: identify the issuer
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", fmt.Errorf("error signing token: %w", err)
	}

	return tokenString, nil
}

// ValidateJWT parses and validates a JWT token string
func ValidateJWT(tokenStr string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		// Check the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtKey, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, errors.New("token has expired")
		}
		return nil, fmt.Errorf("token parsing error: %w", err)
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	// Check issuer if you set one during generation
	// if !claims.VerifyIssuer("your-app-name", true) {
	// 	return nil, errors.New("invalid token issuer")
	// }

	return claims, nil
}
