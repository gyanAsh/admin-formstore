run:
	go run cmd/http_server/main.go

test:
	go test ./src/server

swagger:
	@echo url: http://localhost:4200/swagger.html
	python -m http.server -b 127.0.0.1 4200

check:
	go vet ./src/server
	staticcheck ./src/server
