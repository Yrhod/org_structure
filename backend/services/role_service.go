package services

import (
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

func CreateRole(role models.Role) (int, error) {
	query := `INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING id`
	var id int
	err := config.DB.QueryRow(query, role.Name, role.Description).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failed to create role: %v", err)
	}
	return id, nil
}

func GetRole(id int) (models.Role, error) {
	query := `SELECT id, name, description FROM roles WHERE id = $1`
	var role models.Role
	err := config.DB.QueryRow(query, id).Scan(&role.ID, &role.Name, &role.Description)
	if err != nil {
		return models.Role{}, fmt.Errorf("failed to get role: %v", err)
	}
	return role, nil
}

func UpdateRole(role models.Role) error {
	query := `UPDATE roles SET name = $1, description = $2 WHERE id = $3`
	_, err := config.DB.Exec(query, role.Name, role.Description, role.ID)
	if err != nil {
		return fmt.Errorf("failed to update role: %v", err)
	}
	return nil
}

func DeleteRole(id int) error {
	query := `DELETE FROM roles WHERE id = $1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete role: %v", err)
	}
	return nil
}
