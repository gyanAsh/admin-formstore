package main

import (
	"local.formstore.admin/src/server"
	"log"
)

func main() {
	log.Fatal(server.HttpServiceStart())
}
