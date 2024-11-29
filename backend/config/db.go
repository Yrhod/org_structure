package config

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	connStr := "host=localhost port=5432 user=postgres password=admin dbname=company_structure sslmode=disable"
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %v", err))
	}

	if err = DB.Ping(); err != nil {
		panic(fmt.Sprintf("Database not reachable: %v", err))
	}
	fmt.Println("Database connected successfully")
}
