package server

import (
	"log"
	"testing"
)

func TestMain(m *testing.M) {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	exitCode := m.Run()
	os.Exit(exitCode)
}
