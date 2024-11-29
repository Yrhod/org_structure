package routers

import (
	"org_structure_backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.GET("/employees", controllers.GetEmployees)
}
