package services

import (
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

func CreateProject(project models.Project) (int, error) {
	query := `INSERT INTO projects (name, description, start_date, end_date) 
              VALUES ($1, $2, $3, $4) RETURNING id`
	var id int
	err := config.DB.QueryRow(query, project.Name, project.Description, project.StartDate, project.EndDate).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failed to create project: %v", err)
	}
	return id, nil
}

func GetProject(id int) (models.Project, error) {
	query := `SELECT id, name, description, start_date, end_date FROM projects WHERE id = $1`
	var project models.Project
	err := config.DB.QueryRow(query, id).Scan(&project.ID, &project.Name, &project.Description, &project.StartDate, &project.EndDate)
	if err != nil {
		return models.Project{}, fmt.Errorf("failed to get project: %v", err)
	}
	return project, nil
}

func UpdateProject(project models.Project) error {
	query := `UPDATE projects SET name = $1, description = $2, start_date = $3, end_date = $4 WHERE id = $5`
	_, err := config.DB.Exec(query, project.Name, project.Description, project.StartDate, project.EndDate, project.ID)
	if err != nil {
		return fmt.Errorf("failed to update project: %v", err)
	}
	return nil
}

func DeleteProject(id int) error {
	query := `DELETE FROM projects WHERE id = $1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete project: %v", err)
	}
	return nil
}
