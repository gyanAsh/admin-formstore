package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL  string
	JWTSecretKey string
}

var AppConfig Config

func LoadConfig() {
	// Load .env file. Optional: ignore error if .env doesn't exist for production
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, loading from environment variables")
	}

	AppConfig = Config{
		DatabaseURL:  getEnv("DATABASE_URL", ""),
		JWTSecretKey: getEnv("JWT_SECRET_KEY", ""),
	}

	if AppConfig.DatabaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}
	if AppConfig.JWTSecretKey == "" {
		log.Fatal("JWT_SECRET_KEY environment variable is required")
	}
}

func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultVal
}
