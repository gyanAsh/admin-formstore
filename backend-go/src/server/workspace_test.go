package server 

import (
	"net/http/httptest"
	"testing"
)

func TestWorkspacesHandlerAuth(t *testing.T) {
	r := httptest.NewRequest("GET", "http://localhost:4000/api/workspaces", nil)
	w := httptest.NewRecorder()
	s := Service {
		Queries: nil,
		Conn: nil,
		JwtSecret: []byte{},
	}
	s.WorkspacesHandler(w, r)
	resp := w.Result()

	if resp.StatusCode != 401 {
		t.Fatalf("workspace list authorization passed when it shouldn't have")
	}
}
