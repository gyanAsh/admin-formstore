package endpoints

import (
	"context"
	"io"
	"log"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/require"

	"local.formstore.admin/db"
	apiserver "local.formstore.admin/src/server"
)

var s apiserver.Service

func TestMain(m *testing.M) {
	if err := godotenv.Load("../../.env"); err != nil {
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
	s = apiserver.Service{
		Queries:   dbQueries,
		Conn:      pool,
		JwtSecret: []byte(jwtSecret),
	}

	m.Run()
}

func TestGetRoot(t *testing.T) {
	assert := require.New(t)
	r := httptest.NewRequest("GET", "http://localhost:4000", nil)
	w := httptest.NewRecorder()

	s.RootHandler(w, r)

	resp := w.Result()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("TestGetRoot: %v", err)
	}
	assert.Equal(string(body), "the server is running")
}
