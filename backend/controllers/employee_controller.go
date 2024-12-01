package controllers

import (
	"net/http"
	"org_structure_backend/models"
	"org_structure_backend/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateEmployeeHandler(c *gin.Context) {
	var employee models.Employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid input",
			"details": err.Error(),
		})
		return
	}

	id, err := services.CreateEmployee(employee)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": id})
}

func GetEmployeeHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	employee, err := services.GetEmployee(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, employee)
}

func SearchEmployeesHandler(c *gin.Context) {
	// Получаем фильтры из query-параметров
	filterType := c.DefaultQuery("filter_type", "")
	filterValue := c.DefaultQuery("filter_value", "")

	// Проверка обязательных параметров
	if filterType == "" || filterValue == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "filter_type and filter_value are required"})
		return
	}

	// Вызов сервиса для поиска сотрудников
	employees, err := services.SearchEmployees(filterType, filterValue)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Возвращаем найденных сотрудников
	c.JSON(http.StatusOK, employees)
}

func UpdateEmployeeHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var employee models.Employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	employee.ID = id

	if err := services.UpdateEmployee(employee); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Employee updated"})
}

func DeleteEmployeeHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := services.DeleteEmployee(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Employee deleted"})
}
