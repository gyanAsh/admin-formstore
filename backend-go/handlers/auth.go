package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"

	"backend-formstore/db"     // Update with your module name
	"backend-formstore/models" // Update with your module name
	"backend-formstore/utils"  // Update with your module name

	"github.com/jackc/pgx/v5"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var creds models.Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if creds.Username == "" || creds.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	hashedPassword, err := utils.HashPassword(creds.Password)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Insert user into database
	sql := `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, created_at`
	var userID int
	var createdAt time.Time

	// Use context for timeout/cancellation
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	err = db.Pool.QueryRow(ctx, sql, creds.Username, hashedPassword).Scan(&userID, &createdAt)
	if err != nil {
		// Check if it's a unique constraint violation (username already exists)
		// Note: Error handling for duplicate keys can be database specific.
		// This check might need adjustment based on the exact pgx error.
		// A common approach is to check for pgconn.PgError.Code == "23505" (unique_violation)
		// which requires importing "github.com/jackc/pgx/v5/pgconn"
		// For simplicity, we log and return a generic error here. Refine as needed.
		log.Printf("Error inserting user: %v", err)
		// A more specific check would be needed here for production
		if /* err is unique constraint violation */ false {
			http.Error(w, "Username already exists", http.StatusConflict)
		} else {
			http.Error(w, "Failed to register user", http.StatusInternalServerError)
		}
		return
	}

	// Return success response (don't return password hash)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "User registered successfully",
		"user": map[string]interface{}{
			"id":         userID,
			"username":   creds.Username,
			"created_at": createdAt,
		},
	})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds models.Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if creds.Username == "" || creds.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	var storedUser models.User
	sql := `SELECT id, username, password_hash FROM users WHERE username = $1`

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	err = db.Pool.QueryRow(ctx, sql, creds.Username).Scan(&storedUser.ID, &storedUser.Username, &storedUser.PasswordHash)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		} else {
			log.Printf("Error fetching user: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	// Compare the stored hashed password with the supplied password
	if !utils.CheckPasswordHash(creds.Password, storedUser.PasswordHash) {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	tokenString, err := utils.GenerateJWT(storedUser.ID, storedUser.Username)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Return the token
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": tokenString,
	})
}
