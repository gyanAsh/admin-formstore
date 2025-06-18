package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

type UserRow struct {
	ID       string
	Username string
	Email    string
	Password string
}

type InputAction int

const (
	InputActionSkip InputAction = iota
	InputActionOverride
	InputActionAbort
	InputActionNone
)

func queryUsers(conn *pgx.Conn) ([]UserRow, InputAction, error) {
	rows, err := conn.Query(context.Background(), `SELECT ID, username, email, password FROM users`)
	if err != nil {
		return []UserRow{}, InputActionAbort, fmt.Errorf("select query: %v", err)
	}
	defer rows.Close()
	var users []UserRow
	action := InputActionNone
	for rows.Next() {
		var user UserRow
		err := rows.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
		if err != nil {
			return []UserRow{}, InputActionAbort, fmt.Errorf("scanning: %v", err)
		}
		if strings.HasPrefix(user.Password, "$2a$") ||
			strings.HasPrefix(user.Password, "$2y$") ||
			strings.HasPrefix(user.Password, "$2b$") {
			var answer string
			count := 0
			for action == InputActionNone && count < 3 {
				if count > 0 {
					fmt.Println("invalid answer: %v\ntry again...%v/3", answer, count)
				}
				fmt.Println("User list contains password that are hashed. Do you still wish to continue you can (S)kip (S/Y) / (O)verride / (A)bort (A/N)?.\nRecommended: (S)kip and manually fix/delete incorrect values.")
				fmt.Scanf("%s", &answer)
				if answer == "S" || answer == "Y" {
					action = InputActionSkip
				}
				if answer == "O" {
					action = InputActionOverride
				}
				if answer == "A" || answer == "N" {
					action = InputActionAbort
				}
				count += 1
			}
			if count >= 3 {
				fmt.Println("invalid answer: %v\ntry again...%v/3", answer, count)
				action = InputActionAbort
			}
			if action == InputActionAbort {
				return []UserRow{}, action, nil
			} else if action == InputActionSkip {
				fmt.Println("Skipping user:", user.ID)
				continue
			} else if action == InputActionOverride {
				fmt.Println("Overriding user:", user.ID)
			}
		}
		users = append(users, user)
	}
	return users, InputActionNone, nil
}

func updatePasswords(conn *pgx.Conn, users []UserRow) error {
	if len(users) == 0 {
		return fmt.Errorf("no rows in user object")
	}
	tx, err := conn.Begin(context.Background())
	if err != nil {
		return fmt.Errorf("transaction begin: %v", err)
	}
	defer tx.Rollback(context.Background())
	for _, user := range users {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Println(fmt.Errorf("hashed password generation: %v", err))
			continue
		}
		_, err = tx.Exec(context.Background(), `UPDATE users SET password = $1 WHERE ID = $2`, string(hashedPassword), user.ID)
		if err != nil {
			log.Println(fmt.Errorf("update failed:", err))
		}
	}
	if err = tx.Commit(context.Background()); err != nil {
		return fmt.Errorf("commit error: %v", err)
	}
	return nil
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	if err := godotenv.Load(); err != nil {
		log.Fatal(fmt.Errorf("loading .env: %v", err))
	}
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(fmt.Errorf("database connection: %v", err))
		return
	}
	defer conn.Close(context.Background())

	users, action, err := queryUsers(conn)
	if err != nil {
		log.Fatal(fmt.Errorf("excution aborted with error: query users: %v", err))
		return
	}
	switch action {
	case InputActionSkip, InputActionOverride, InputActionNone:
		if len(users) == 0 {
			fmt.Printf("Users updated %d, changes successfully applied.\n", len(users))
			return
		}
		if err := updatePasswords(conn, users); err != nil {
			log.Println(fmt.Errorf("update pasword failed: %v", err))
		} else {
			fmt.Printf("Users updated %d, changes successfully applied.\n", len(users))
		}
	case InputActionAbort:
		log.Println("execution aborted.")
		return
	}

}
