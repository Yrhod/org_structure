package services

import (
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

func CreateDepartment(department models.Department) (int, error) {
	query := `INSERT INTO departments (name) VALUES ($1) RETURNING id`
	var id int
	err := config.DB.QueryRow(query, department.Name).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failed to create department: %v", err)
	}
	return id, nil
}

func GetDepartment(id int) (models.Department, error) {
	query := `SELECT id, name FROM departments WHERE id = $1`
	var department models.Department
	err := config.DB.QueryRow(query, id).Scan(&department.ID, &department.Name)
	if err != nil {
		return models.Department{}, fmt.Errorf("failed to get department: %v", err)
	}
	return department, nil
}

func UpdateDepartment(department models.Department) error {
	query := `UPDATE departments SET name = $1 WHERE id = $2`
	_, err := config.DB.Exec(query, department.Name, department.ID)
	if err != nil {
		return fmt.Errorf("failed to update department: %v", err)
	}
	return nil
}

func DeleteDepartment(id int) error {
	query := `DELETE FROM departments WHERE id = $1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete department: %v", err)
	}
	return nil
}
