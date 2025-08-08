package server

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"local.formstore.admin/db"
)

type Service struct {
	Queries   *db.Queries
	Conn      *pgxpool.Pool
	JwtSecret []byte
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Method, r.URL)
		next.ServeHTTP(w, r)
	})
}

func (s *Service) RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("the server is running"))
}

func HttpServiceStart() error {
	if err := godotenv.Load(".env.local"); err != nil {
		if err = godotenv.Load(".env"); err != nil {
			log.Fatal(err)
		}
	}
	log.Printf("environment: %v\n", os.Getenv("ENVIRONMENT"))
	if os.Getenv("ENVIRONMENT") == "" {
		log.Fatal(fmt.Errorf("ENVIRONMENT is required, possible values: [DEV, PROD]"))
	}
	pool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()
	jwtSecretRaw := os.Getenv("JWT_SECRET")
	if jwtSecretRaw == "" {
		log.Fatal(fmt.Errorf("JWT_SECRET not found: ", err))
	}
	jwtSecret, err := base64.StdEncoding.DecodeString(jwtSecretRaw)
	if err != nil {
		log.Fatalf("failed to decoded JWT_SECRET not in based64 format: %s", jwtSecret)
	}

	dbQueries := db.New(pool)

	s := Service{
		Queries:   dbQueries,
		Conn:      pool,
		JwtSecret: jwtSecret,
	}

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /", s.RootHandler)
	mux.HandleFunc("GET /api/workspaces", s.WorkspacesHandler)
	mux.HandleFunc("GET /api/workspace/{workspace_id}", s.FormsHandler)
	mux.HandleFunc("GET /api/form/{form_id}", s.FormDataHandler)
	mux.HandleFunc("GET /api/published/form/{public_id}", s.PublishedFormDataHandler)

	mux.HandleFunc("POST /api/workspace", s.WorkspaceCreateHandler)
	mux.HandleFunc("POST /api/form", s.FormCreateHandler)
	mux.HandleFunc("POST /api/verify", s.VerifyUserHandler)
	mux.HandleFunc("POST /api/login", s.LoginHandler)
	mux.HandleFunc("POST /api/signup", s.SignupHandler)
	mux.HandleFunc("POST /api/form/publish", s.FormPublishHandler)
	mux.HandleFunc("POST /api/form/save", s.FormSaveHandler)

	mux.HandleFunc("PUT /api/workspace", s.WorkspaceUpdateHandler)
	mux.HandleFunc("PUT /api/form", s.FormUpdateHandler)

	mux.HandleFunc("DELETE /api/workspace/{workspace_id}", s.WorkspaceDeleteHandler)
	mux.HandleFunc("DELETE /api/form/{form_id}", s.FormDeleteHandler)

	log.Println("running on: http://localhost:4000")
	return http.ListenAndServe(":4000", loggingMiddleware(mux))
}
