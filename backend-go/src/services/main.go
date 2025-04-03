package services

import (
	"log"
	"net/http"
)

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("the server is running"))
}

func HttpStart() error {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", rootHandler)
	log.Println("running on: http://localhost:4000")
	return http.ListenAndServe(":4000", mux)
}
