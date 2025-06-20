package server

import (
	"context"
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
	pool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatalf("failed to load JWT_SECRET: %s", jwtSecret)
	}

	dbQueries := db.New(pool)

	s := Service{
		Queries:   dbQueries,
		Conn:      pool,
		JwtSecret: []byte(jwtSecret),
	}

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /", s.rootHandler)
	mux.HandleFunc("GET /api/workspaces", s.workspacesHandler)
	mux.HandleFunc("GET /api/workspace/{workspace_id}", s.formsHandler)
	mux.HandleFunc("GET /api/form/{form_id}", s.formDataHandler)
	mux.HandleFunc("GET /api/published/form/{form_id}", s.publishedFormDataHandler)

	mux.HandleFunc("POST /api/workspace", s.workspaceCreateHandler)
	mux.HandleFunc("POST /api/form", s.formCreateHandler)
	mux.HandleFunc("POST /api/verify", s.verifyUserHandler)
	mux.HandleFunc("POST /api/login", s.loginHandler)
	mux.HandleFunc("POST /api/signup", s.signupHandler)
	mux.HandleFunc("POST /api/form/publish", s.formPublishHandler)

	mux.HandleFunc("PUT /api/workspace", s.workspaceUpdateHandler)
	mux.HandleFunc("PUT /api/form", s.formUpdateHandler)

	mux.HandleFunc("DELETE /api/workspace", s.workspaceDeleteHandler)
	mux.HandleFunc("DELETE /api/form", s.formDeleteHandler)

	log.Println("running on: http://localhost:4000")
	return http.ListenAndServe(":4000", LoggingMiddleware(mux))
}
