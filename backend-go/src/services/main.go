package services

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

type Service struct {
	DB        *pgx.Conn
	JwtSecret []byte
}

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Method, r.URL)
		next.ServeHTTP(w, r)
	})
}

func (s *Service) rootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("the server is running"))
}

func HttpServiceStart() error {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	defer conn.Close(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatalf("failed to load JWT_SECRET: %s", jwtSecret)
	}

	s := Service{
		DB:        conn,
		JwtSecret: []byte(jwtSecret),
	}

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /", s.rootHandler)
	mux.HandleFunc("GET /api/workspaces", s.workspacesHandler)
	mux.HandleFunc("GET /api/workspace/{workspace_id}/forms", s.formsHandler)

	mux.HandleFunc("POST /api/workspace", s.workspaceCreateHandler)
	mux.HandleFunc("POST /api/workspace/form", s.formCreateHandler)
	mux.HandleFunc("POST /api/login", s.loginHandler)

	log.Println("running on: http://localhost:4000")
	return http.ListenAndServe(":4000", LoggingMiddleware(mux))
}
