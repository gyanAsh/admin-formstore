package main

import (
	"local.formstore.admin/src/services"
	"log"
)

func main() {
	log.Fatal(services.HttpServiceStart())
}
