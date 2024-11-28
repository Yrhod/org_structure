package main

import (
	"github.com/gin-gonic/gin"
	"org_structure_backend/config"
)

func main() {
	router := gin.Default()
	config.ConnectDB()
	router.Run(":8080")

	// Пример маршрута
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.Run(":8080")
}
