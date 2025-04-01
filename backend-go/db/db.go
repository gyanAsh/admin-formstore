package db

import (
	"context"
	"log"
	"time"

	"backend-formstore/config" // Update with your module name

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func ConnectDB() {
	var err error
	// Use ParseConfig instead of just the URL string for more options
	dbConfig, err := pgxpool.ParseConfig(config.AppConfig.DatabaseURL)
	if err != nil {
		log.Fatalf("Unable to parse database config: %v\n", err)
	}

	// Optional: Configure pool settings
	dbConfig.MaxConns = 10 // Example: Max 10 connections
	dbConfig.MinConns = 2  // Example: Min 2 connections
	dbConfig.MaxConnLifetime = time.Hour
	dbConfig.MaxConnIdleTime = 30 * time.Minute

	// Connect using the parsed config
	Pool, err = pgxpool.NewWithConfig(context.Background(), dbConfig)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}

	// Optional: Ping the database to verify connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err = Pool.Ping(ctx); err != nil {
		log.Fatalf("Database ping failed: %v\n", err)
	}

	log.Println("Database connection pool established")

	// Run migrations/table creation here if not handled separately
	createUsersTable()
}

func createUsersTable() {
	createTableSQL := `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`

	_, err := Pool.Exec(context.Background(), createTableSQL)
	if err != nil {
		log.Fatalf("Unable to create users table: %v\n", err)
	}
	log.Println("Users table checked/created successfully.")
}

// CloseDB closes the database connection pool
func CloseDB() {
	if Pool != nil {
		Pool.Close()
		log.Println("Database connection pool closed.")
	}
}
