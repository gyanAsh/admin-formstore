package server

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`
}

func (s *Service) signupHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if user.Username == "" {
		log.Println("missing username is user data")
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "username is empty",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	if user.Email == "" {
		log.Println("missing email is user data")
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "email is empty",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	if user.Password == "" {
		log.Println("missing password is user data")
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "password is empty",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	row := s.Conn.QueryRow(context.Background(), `INSERT INTO users
		(username, email, password) VALUES ($1, $2, $3) RETURNING ID`,
		user.Username, user.Email, user.Password)
	if err := row.Scan(&user.ID); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusConflict)
		if err = json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "email already used, please login or choose forget password",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	tokenString, err := generateAuthToken(user.ID, s.JwtSecret)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "failed to generate jwt token",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	if err = json.NewEncoder(w).Encode(map[string]interface{}{
		"jwt_token": tokenString,
	}); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
