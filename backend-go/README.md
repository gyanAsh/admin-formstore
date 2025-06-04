# How to run

## Dependencies
- go
- make (optional but recommended)
- sqlc (optional)
- golang-migrate (optional)
- python (optional for swagger ui)


## Dev
`make run`
or
`go run cmd/http_server/main.go`

## Production
`go build cmd/http_server/main.go`

## Testing
`make test`
or
`go test ./src/server`


# Optional

## DATABASE migration

`migrate -path ./migrations/ -database $DATABASE_URL up`

[check golang-migrate docs](https://github.com/golang-migrate/migrate#cli-usage)

## SQLC
`sqlc generate`


# SwaggerUI (OpenAPI 3)
`make swagger`
to use it with python.
Otherwise use any static server to view `swagger.html`.

After that go to [swagger-ui](http://localhost:4200/swagger.html).
