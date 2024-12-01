package main

import (
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/routers"
	"org_structure_backend/services"
)

func main() {

	config.InitDB()
	defer config.DB.Close()
	services.Migrate()

	router := routers.SetupRouter()

	router.Run(":8081")

	fmt.Println("Application started successfully!")
}
