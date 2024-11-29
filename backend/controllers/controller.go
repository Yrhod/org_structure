package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEmployees(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"employees": []string{"Alice", "Bob", "Charlie"},
	})
}
