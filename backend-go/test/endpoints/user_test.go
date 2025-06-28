package endpoints

import (
	"crypto/rand"
	"fmt"
	"net/http/httptest"
	"testing"
)

func TestSignup(t *testing.T) {
	randomName := rand.Text()[:8]
	httptest.NewRequest("POST", "http://localhost:4000/api/signup", map[string]any{
		"username": randomName,
		"email":    fmt.Sprintf("%s@mail.com", randomName),
		"password": fmt.Sprint("%sPassword@123", randomName),
	})
}
