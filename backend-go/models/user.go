package models

import "time"

// User represents the user model in the database
type User struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"` // Don't expose hash in JSON responses
	CreatedAt    time.Time `json:"created_at"`
}

// Credentials struct for login/registration JSON payloads
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
