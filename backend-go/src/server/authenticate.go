package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func (s *Service) authenticate(r *http.Request) (int64, error) {
	authorizationHeader := r.Header.Get("Authorization")
	chunks := strings.Split(authorizationHeader, " ")
	if len(chunks) < 2 {
		return 0, fmt.Errorf("failed to authencated with Error: incorrect Authorization header with value: %s", authorizationHeader)
	}
	bearerValue := chunks[0]
	tokenString := chunks[1]
	if bearerValue != "Bearer" {
		log.Println(authorizationHeader)
		return 0, fmt.Errorf("failed to authenticate with Error: failed to parse bearer token Bearer keyword not found within %s", authorizationHeader)
	}
	return parseAuthToken(tokenString, s.JwtSecret)
}
