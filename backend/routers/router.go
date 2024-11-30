package routers

import (
	"github.com/gin-gonic/gin"
	"org_structure_backend/controllers"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Группы маршрутов для удобной организации
	api := router.Group("/api")
	{
		//employees route
		api.POST("/employees", controllers.CreateEmployeeHandler)
		api.GET("/employees/:id", controllers.GetEmployeeHandler)
		api.PUT("/employees/:id", controllers.UpdateEmployeeHandler)
		api.DELETE("/employees/:id", controllers.DeleteEmployeeHandler)
		api.GET("/employees/search", controllers.SearchEmployeesHandler)

		//hierarchy route
		api.GET("/employees/:id/hierarchy", controllers.GetEmployeeHierarchyHandler)

		//department route
		api.POST("/department", controllers.CreateDepartmentHandler)
		api.GET("/department/:id", controllers.GetDepartmentHandler)
		api.PUT("/department/:id", controllers.UpdateDepartmentHandler)
		api.DELETE("/department/:id", controllers.DeleteDepartmentHandler)

		//role route
		api.POST("/role", controllers.CreateRoleHandler)
		api.GET("/role/:id", controllers.GetRoleHandler)
		api.PUT("/role/:id", controllers.UpdateRoleHandler)
		api.DELETE("/role/:id", controllers.DeleteRoleHandler)

		//project route
		api.POST("/project", controllers.CreateProjectHandler)
		api.GET("/project/:id", controllers.GetProjectHandler)
		api.PUT("/project/:id", controllers.UpdateProjectHandler)
		api.DELETE("/project/:id", controllers.DeleteProjectHandler)

	}

	return router
}
