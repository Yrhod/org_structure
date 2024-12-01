package services

import (
	"database/sql"
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

func SearchHierarchy(employeeID int) (*models.Employee, []*models.Employee, []*models.Employee, error) {
	var employee models.Employee
	var manager *models.Employee
	var colleagues []*models.Employee
	var subordinates []*models.Employee

	// Получаем данные о сотруднике
	queryEmployee := `SELECT id, first_name, last_name, position, department_id, role_id, project_id, manager_id, city, phone, email, calendar_link 
					  FROM employees WHERE id = $1`
	err := config.DB.QueryRow(queryEmployee, employeeID).Scan(
		&employee.ID, &employee.FirstName, &employee.LastName, &employee.Position,
		&employee.DepartmentID, &employee.RoleID, &employee.ProjectID, &employee.ManagerID,
		&employee.City, &employee.Phone, &employee.Email, &employee.CalendarLink,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil, nil, fmt.Errorf("employee not found")
		}
		return nil, nil, nil, fmt.Errorf("failed to get employee: %v", err)
	}

	// Получаем название департамента сотрудника
	employee.DepartmentName, err = getDepartmentName(employee.DepartmentID)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to get department name: %v", err)
	}

	// Получаем данные о менеджере, если указан manager_id
	if employee.ManagerID != nil {
		manager, err = GetManager(*employee.ManagerID)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("failed to get manager: %v", err)
		}
		// Добавляем название департамента менеджеру
		manager.DepartmentName, err = getDepartmentName(manager.DepartmentID)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("failed to get manager's department name: %v", err)
		}
	}

	// Получаем данные о подчиненных сотрудниках
	querySubordinates := `SELECT id, first_name, last_name, position, department_id, city, phone, email 
						  FROM employees WHERE manager_id = $1`
	rows, err := config.DB.Query(querySubordinates, employee.ID)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to get subordinates: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var subordinate models.Employee
		err := rows.Scan(&subordinate.ID, &subordinate.FirstName, &subordinate.LastName, &subordinate.Position, &subordinate.DepartmentID, &subordinate.City, &subordinate.Phone, &subordinate.Email)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("failed to parse subordinate data: %v", err)
		}
		subordinate.DepartmentName, err = getDepartmentName(subordinate.DepartmentID)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("failed to get subordinate's department name: %v", err)
		}
		subordinates = append(subordinates, &subordinate)
	}

	// Получаем данные о коллегах
	queryColleagues := `SELECT id, first_name, last_name, position, department_id, city, phone, email 
						FROM employees 
						WHERE department_id = $1 AND role_id = $2 AND project_id = $3 AND id != $4`
	rows, err = config.DB.Query(queryColleagues, employee.DepartmentID, employee.RoleID, employee.ProjectID, employee.ID)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to get colleagues: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var colleague models.Employee
		err := rows.Scan(&colleague.ID, &colleague.FirstName, &colleague.LastName, &colleague.Position, &colleague.DepartmentID, &colleague.City, &colleague.Phone, &colleague.Email)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("failed to parse colleague data: %v", err)
		}
		colleague.DepartmentName, err = getDepartmentName(colleague.DepartmentID)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("failed to get colleague's department name: %v", err)
		}
		colleagues = append(colleagues, &colleague)
	}

	// Добавляем подчиненных к сотруднику
	employee.Subordinates = subordinates

	return manager, colleagues, subordinates, nil
}

// GetManager получает данные о менеджере.
func GetManager(managerID int) (*models.Employee, error) {
	query := `SELECT id, first_name, last_name, position, department_id, role_id, project_id, city, phone, email, calendar_link 
			  FROM employees WHERE id = $1`
	var manager models.Employee
	err := config.DB.QueryRow(query, managerID).Scan(
		&manager.ID, &manager.FirstName, &manager.LastName, &manager.Position,
		&manager.DepartmentID, &manager.RoleID, &manager.ProjectID, &manager.City, &manager.Phone, &manager.Email, &manager.CalendarLink,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("manager not found")
		}
		return nil, fmt.Errorf("failed to get manager: %v", err)
	}
	return &manager, nil
}

// getDepartmentName возвращает название департамента по его ID.
func getDepartmentName(departmentID int) (string, error) {
	var departmentName string
	query := `SELECT name FROM departments WHERE id = $1`
	err := config.DB.QueryRow(query, departmentID).Scan(&departmentName)
	if err != nil {
		if err == sql.ErrNoRows {
			return "Неизвестный департамент", nil
		}
		return "", fmt.Errorf("failed to get department name: %v", err)
	}
	return departmentName, nil
}
