package config

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func ConnectDB() {
	dsn := "host=localhost user=postgres password=yourpassword dbname=org_chart sslmode=disable"
	var err error
	DB, err = sqlx.Connect("postgres", dsn)
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to DB: %v", err))
	}
	fmt.Println("Connected to DB")
}
