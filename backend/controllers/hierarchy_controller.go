package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"org_structure_backend/services"
)

func GetEmployeeHierarchyHandler(c *gin.Context) {
	// Получение ID сотрудника из параметров запроса
	employeeID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid employee ID"})
		return
	}

	// Вызов сервиса для поиска
	manager, colleagues, err := services.SearchHierarchy(employeeID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Формирование ответа
	c.JSON(http.StatusOK, gin.H{
		"manager":    manager,
		"colleagues": colleagues,
	})
}
