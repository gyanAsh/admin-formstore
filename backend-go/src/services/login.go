package services

import (
	"encoding/json"
	"log"
	"net/http"
)

type UserLoginData struct {
	ID       int64  `json:"id", omitempty`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (s *Service) loginHandler(w http.ResponseWriter, r *http.Request) {
	var user UserLoginData
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"messsage": "failed to parse json data check if data is formatted correctly",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	if user.Username == "" {
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "missing or null field email",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	if user.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "missing or null field password",
		}); err != nil {
			log.Println(err)
		}
		return
	}

	row := s.DB.QueryRow(r.Context(), `SELECT ID, password FROM users WHERE username = $1`, user.Username)
	var dbUserID int64
	var dbUserPassword string
	if err := row.Scan(&dbUserID, &dbUserPassword); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "user not found, please signup user before continuing",
		})
		return
	}
	if dbUserPassword != user.Password {
		w.WriteHeader(http.StatusUnauthorized)
		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "incorrect username or password",
		}); err != nil {
			log.Println(err)
		}
		return
	}

	tokenString, err := generateAuthToken(dbUserID, s.JwtSecret)
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

	json.NewEncoder(w).Encode(map[string]interface{}{
		"jwt_token": tokenString,
	})
}
