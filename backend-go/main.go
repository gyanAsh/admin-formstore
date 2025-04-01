package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend-formstore/config"     // Update with your module name
	"backend-formstore/db"         // Update with your module name
	"backend-formstore/handlers"   // Update with your module name
	"backend-formstore/middleware" // Update with your module name

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware" // Alias chi's middleware
)

func main() {
	// Load Configuration
	config.LoadConfig()

	// Initialize Database
	db.ConnectDB()
	defer db.CloseDB() // Ensure pool is closed on exit

	// Setup Router
	r := chi.NewRouter()

	// Middleware
	r.Use(chimiddleware.RequestID)                 // Add request IDs
	r.Use(chimiddleware.RealIP)                    // Get real IP
	r.Use(chimiddleware.Logger)                    // Log requests
	r.Use(chimiddleware.Recoverer)                 // Recover from panics
	r.Use(chimiddleware.Timeout(60 * time.Second)) // Set request timeout

	// Public routes
	r.Post("/register", handlers.RegisterHandler)
	r.Post("/login", handlers.LoginHandler)

	// Protected routes (grouped under JWT authentication middleware)
	r.Group(func(r chi.Router) {
		// Apply the JWT middleware to this group
		r.Use(middleware.JwtAuthentication)

		// Define protected endpoints here
		r.Get("/protected", handlers.ProtectedHandler)
		// Add more protected routes as needed
		// r.Get("/profile", handlers.ProfileHandler)
		// r.Post("/items", handlers.CreateItemHandler)
	})

	// Server Setup
	server := &http.Server{
		Addr:    ":8080", // Or ":"+os.Getenv("PORT") for deployment flexibility
		Handler: r,
		// Add other server settings like timeouts if needed
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful Shutdown Handling
	go func() {
		log.Printf("Server starting on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Could not listen on %s: %v\n", server.Addr, err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// The context is used to inform the server it has 5 seconds to finish
	// the requests it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}
