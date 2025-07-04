package server

import (
	"log"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	exitCode := m.Run()
	os.Exit(exitCode)
}
