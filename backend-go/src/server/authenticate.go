package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func (s *Service) authenticate(r *http.Request) (string, error) {
	authorizationHeader := r.Header.Get("Authorization")
	chunks := strings.Split(authorizationHeader, " ")
	if len(chunks) < 2 {
		return "", fmt.Errorf("failed to authencated with Error: incorrect Authorization header with value: %s", authorizationHeader)
	}
	bearerValue := chunks[0]
	tokenString := chunks[1]
	if bearerValue != "Bearer" {
		log.Println(authorizationHeader)
		return "", fmt.Errorf("failed to authenticate with Error: failed to parse bearer token Bearer keyword not found within %s", authorizationHeader)
	}
	return ParseAuthToken(tokenString, s.JwtSecret)
}

func authenticate2(r *http.Request, JWT_SECRET []byte) (string, error) {
	authorizationHeader := r.Header.Get("Authorization")
	chunks := strings.Split(authorizationHeader, " ")
	if len(chunks) < 2 {
		return "", fmt.Errorf("failed to authencated with Error: incorrect Authorization header with value: %s", authorizationHeader)
	}
	bearerValue := chunks[0]
	tokenString := chunks[1]
	if bearerValue != "Bearer" {
		log.Println(authorizationHeader)
		return "", fmt.Errorf("failed to authenticate with Error: failed to parse bearer token Bearer keyword not found within %s", authorizationHeader)
	}
	return ParseAuthToken(tokenString, JWT_SECRET)
}

func getUserID(r *http.Request) (string, error) {
	userID, ok := r.Context().Value("user_id").(string)
	if !ok {
		return "", fmt.Errorf("invalid: user id not found")
	}
	return userID, nil
}
