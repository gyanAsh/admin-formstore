package server

import (
	"encoding/json"
	"log"
	"net/http"
)

func (s *Service) loginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
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
	if user.Email == "" {
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

	row := s.DB.QueryRow(r.Context(), `SELECT ID, password FROM users WHERE email = $1`, user.Email)
	var dbUserPassword string
	if err := row.Scan(&user.ID, &dbUserPassword); err != nil {
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
			"message": "incorrect email or password",
		}); err != nil {
			log.Println(err)
		}
		return
	}
	if user.ID == 0 {
		log.Println("invalid value in user id")
		w.WriteHeader(http.StatusInternalServerError)
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
