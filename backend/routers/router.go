package routers

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"org_structure_backend/controllers"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Добавляем CORS middleware
	router.Use(cors.Default()) // Используем стандартные настройки CORS

	// Группы маршрутов для удобной организации
	api := router.Group("/api")
	{
		// Маршруты для сотрудников
		api.POST("/employees", controllers.CreateEmployeeHandler)
		api.GET("/employees/:id", controllers.GetEmployeeHandler)
		api.PUT("/employees/:id", controllers.UpdateEmployeeHandler)
		api.DELETE("/employees/:id", controllers.DeleteEmployeeHandler)
		api.GET("/employees/search", controllers.SearchEmployeesHandler)

		// Маршрут для иерархии сотрудников
		api.GET("/employees/:id/hierarchy", controllers.GetEmployeeHierarchyHandler)

		// Маршруты для департаментов
		api.POST("/department", controllers.CreateDepartmentHandler)
		api.GET("/department/:id", controllers.GetDepartmentHandler)
		api.PUT("/department/:id", controllers.UpdateDepartmentHandler)
		api.DELETE("/department/:id", controllers.DeleteDepartmentHandler)

		// Маршруты для ролей
		api.POST("/role", controllers.CreateRoleHandler)
		api.GET("/role/:id", controllers.GetRoleHandler)
		api.PUT("/role/:id", controllers.UpdateRoleHandler)
		api.DELETE("/role/:id", controllers.DeleteRoleHandler)

		// Маршруты для проектов
		api.POST("/project", controllers.CreateProjectHandler)
		api.GET("/project/:id", controllers.GetProjectHandler)
		api.PUT("/project/:id", controllers.UpdateProjectHandler)
		api.DELETE("/project/:id", controllers.DeleteProjectHandler)
	}

	return router
}
