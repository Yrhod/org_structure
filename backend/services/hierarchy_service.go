package services

import (
	"database/sql"
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

// SearchHierarchy находит менеджера и коллег сотрудника.
func SearchHierarchy(employeeID int) (*models.Employee, []*models.Employee, error) {
	var employee models.Employee
	var manager *models.Employee
	var colleagues []*models.Employee

	// Получаем данные о сотруднике
	queryEmployee := `SELECT id, first_name, last_name, position, department_id, role_id, project_id, manager_id, city, email, calendar_link 
					  FROM employees WHERE id = $1`
	err := config.DB.QueryRow(queryEmployee, employeeID).Scan(
		&employee.ID, &employee.FirstName, &employee.LastName, &employee.Position,
		&employee.DepartmentID, &employee.RoleID, &employee.ProjectID, &employee.ManagerID,
		&employee.City, &employee.Email, &employee.CalendarLink,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil, fmt.Errorf("employee not found")
		}
		return nil, nil, fmt.Errorf("failed to get employee: %v", err)
	}

	// Получаем данные о менеджере, если указан manager_id
	if employee.ManagerID != nil {
		manager, err = GetManager(*employee.ManagerID)
		if err != nil {
			return nil, nil, fmt.Errorf("failed to get manager: %v", err)
		}
	}

	// Получаем данные о коллегах
	queryColleagues := `SELECT id, first_name, last_name, position, city, email 
						FROM employees 
						WHERE department_id = $1 AND role_id = $2 AND project_id = $3 AND id != $4`
	rows, err := config.DB.Query(queryColleagues, employee.DepartmentID, employee.RoleID, employee.ProjectID, employee.ID)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get colleagues: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var colleague models.Employee
		err := rows.Scan(&colleague.ID, &colleague.FirstName, &colleague.LastName, &colleague.Position, &colleague.City, &colleague.Email)
		if err != nil {
			return nil, nil, fmt.Errorf("failed to parse colleague data: %v", err)
		}
		colleagues = append(colleagues, &colleague)
	}

	return manager, colleagues, nil
}

// GetManager получает данные о менеджере.
func GetManager(managerID int) (*models.Employee, error) {
	query := `SELECT id, first_name, last_name, position, department_id, role_id, project_id, city, email, calendar_link 
			  FROM employees WHERE id = $1`
	var manager models.Employee
	err := config.DB.QueryRow(query, managerID).Scan(
		&manager.ID, &manager.FirstName, &manager.LastName, &manager.Position,
		&manager.DepartmentID, &manager.RoleID, &manager.ProjectID, &manager.City, &manager.Email, &manager.CalendarLink,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("manager not found")
		}
		return nil, fmt.Errorf("failed to get manager: %v", err)
	}
	return &manager, nil
}
