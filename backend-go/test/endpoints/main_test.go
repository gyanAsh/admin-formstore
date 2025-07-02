package endpoints

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
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
var AUTH_TOKEN string

type UserDat struct {
	Username string `json:"username,omitempty"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func ReadAuthCache() (UserDat, error) {
	dat, err := os.ReadFile("./tmp/auth.json")
	if err != nil {
		return UserDat{}, fmt.Errorf("file reading ./tmp/auth.json: %v", err)
	}
	var user UserDat
	if err = json.Unmarshal(dat, &user); err != nil {
		return UserDat{}, fmt.Errorf("json marshal: %v", err)
	}
	return user, nil
}

func WriteAuthCache(userdat UserDat) error {
	dat, err := json.Marshal(userdat)
	if err != nil {
		return fmt.Errorf("json marshal: %v", err)
	}
	if err = os.MkdirAll("./tmp", 0744); err != nil {
		log.Println(fmt.Errorf("mkdir error (optional): %v", err))
	}
	if err := os.WriteFile("./tmp/auth.json", dat, 0644); err != nil {
		return fmt.Errorf("write file: %v", err)
	}
	return nil
}

func parseResponseBody(resp *http.Response) (string, error) {
	dat, err := io.ReadAll(resp.Body)
	if err != nil {
		return "no body", fmt.Errorf("failed to read response body: %v", err)
	}
	var errmsg map[string]string
	if err = json.Unmarshal(dat, errmsg); err != nil {
		return string(dat), fmt.Errorf("failed to parse json data: %v", err)
	}
	return fmt.Sprint(dat), nil
}

func parseTokenString(resp *http.Response) (string, error) {
	var claims map[string]string
	if err := json.NewDecoder(resp.Body).Decode(&claims); err != nil {
		return "", fmt.Errorf("json decode: %v", err)
	}
	return claims["jwt_token"], nil
}

func loginReq(userdat UserDat) (string, error) {
	dat, err := json.Marshal(userdat)
	if err != nil {
		return "", fmt.Errorf("json marshal: %v", err)
	}
	r := httptest.NewRequest("POST", "http://localhost:4000/login", bytes.NewBuffer(dat))
	r.Header.Add("Content-Type", "application/json")
	w := httptest.NewRecorder()

	s.LoginHandler(w, r)

	resp := w.Result()
	if resp.StatusCode != 200 {
		respBody, _ := parseResponseBody(resp)
		return "", fmt.Errorf("status: %v error: %v", resp.Status, respBody)
	}

	tokenString, err := parseTokenString(resp)
	if err != nil {
		return "", fmt.Errorf("parse token string: %v", err)
	}

	return tokenString, nil
}

func signupReq() (UserDat, string, error) {
	var userdat UserDat
	userdat.Username = rand.Text()[:12]
	userdat.Email = fmt.Sprintf("%sEmail@mail.com", userdat.Username)
	userdat.Password = fmt.Sprintf("%sPassword@123", userdat.Username)

	dat, err := json.Marshal(userdat)
	if err != nil {
		return UserDat{}, "", fmt.Errorf("json marshal: %v", err)
	}

	r := httptest.NewRequest("POST", "http://localhost:4000/signup", bytes.NewBuffer(dat))
	w := httptest.NewRecorder()

	s.SignupHandler(w, r)

	resp := w.Result()
	if resp.StatusCode != 200 {
		respBody, _ := parseResponseBody(resp)
		return UserDat{}, "", fmt.Errorf("status: %v error: %v", resp.Status, respBody)
	}

	tokenString, err := parseTokenString(resp)
	if err != nil {
		return UserDat{}, "", fmt.Errorf("parse token string: %v", err)
	}

	return userdat, tokenString, nil
}

func TestMain(m *testing.M) {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

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

	if userdat, err := ReadAuthCache(); err != nil {
		log.Printf("read auth cache: %v\n", err)
		userdat, tokenString, err := signupReq()
		if err != nil {
			log.Fatalf("signup request: %v", err)
			os.Exit(1)
		}
		AUTH_TOKEN = tokenString
		log.Println("signup successful")

		if err = WriteAuthCache(userdat); err != nil {
			log.Fatalf("write auth cache: %v", err)
			os.Exit(1)
		}
	} else {
		if tokenString, err := loginReq(userdat); err != nil {
			log.Fatalf("login request: %v", err)
			os.Exit(1)
		} else {
			AUTH_TOKEN = tokenString
		}
		log.Println("login successful")
	}

	if AUTH_TOKEN == "" {
		log.Println("AUTH_TOKEN is empty")
		os.Exit(1)
	}

	exitCode := m.Run()
	os.Exit(exitCode)
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
