package services

import (
	"database/sql"
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

func CreateEmployee(employee models.Employee) (int, error) {
	query := `INSERT INTO employees (first_name, last_name, position, manager_id, department_id, role_id, project_id, city, email, calendar_link)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`
	var id int
	err := config.DB.QueryRow(query, employee.FirstName, employee.LastName, employee.Position, employee.ManagerID, employee.DepartmentID, employee.RoleID, employee.ProjectID, employee.City, employee.Email, employee.CalendarLink).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failed to create employee: %v", err)
	}
	return id, nil
}

func SearchEmployees(position, departmentID, roleID, projectID, city, email string) ([]models.Employee, error) {
	// Начинаем с базового SQL-запроса
	query := `SELECT id, first_name, last_name, position, manager_id, department_id, role_id, project_id, city, email, calendar_link 
              FROM employees WHERE 1=1`
	var args []interface{}
	var argCount int

	// Фильтр по должности (если задано)
	if position != "" {
		argCount++
		query += fmt.Sprintf(" AND position = $%d", argCount)
		args = append(args, position)
	}

	// Фильтр по departmentID (если задано)
	if departmentID != "" {
		argCount++
		query += fmt.Sprintf(" AND department_id = $%d", argCount)
		args = append(args, departmentID)
	}

	// Фильтр по roleID (если задано)
	if roleID != "" {
		argCount++
		query += fmt.Sprintf(" AND role_id = $%d", argCount)
		args = append(args, roleID)
	}

	// Фильтр по projectID (если задано)
	if projectID != "" {
		argCount++
		query += fmt.Sprintf(" AND project_id = $%d", argCount)
		args = append(args, projectID)
	}

	// Фильтр по городу (если задано)
	if city != "" {
		argCount++
		query += fmt.Sprintf(" AND city = $%d", argCount)
		args = append(args, city)
	}

	// Фильтр по email (если задано)
	if email != "" {
		argCount++
		query += fmt.Sprintf(" AND email = $%d", argCount)
		args = append(args, email)
	}

	// Выполнение запроса с фильтрами
	rows, err := config.DB.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch employees: %v", err)
	}
	defer rows.Close()

	// Список сотрудников
	var employees []models.Employee
	for rows.Next() {
		var employee models.Employee
		err := rows.Scan(&employee.ID, &employee.FirstName, &employee.LastName, &employee.Position, &employee.ManagerID,
			&employee.DepartmentID, &employee.RoleID, &employee.ProjectID, &employee.City, &employee.Email, &employee.CalendarLink)
		if err != nil {
			return nil, fmt.Errorf("failed to scan employee: %v", err)
		}
		employees = append(employees, employee)
	}

	return employees, nil
}

func GetEmployee(id int) (models.Employee, error) {
	query := `SELECT id, first_name, last_name, position, manager_id, department_id, role_id, project_id, city, email, calendar_link 
              FROM employees WHERE id = $1`
	var employee models.Employee
	err := config.DB.QueryRow(query, id).Scan(
		&employee.ID, &employee.FirstName, &employee.LastName, &employee.Position, &employee.ManagerID,
		&employee.DepartmentID, &employee.RoleID, &employee.ProjectID, &employee.City, &employee.Email, &employee.CalendarLink,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.Employee{}, fmt.Errorf("employee not found")
		}
		return models.Employee{}, fmt.Errorf("failed to get employee: %v", err)
	}

	// Если есть ManagerID, получаем данные менеджера
	if employee.ManagerID != nil {
		manager, err := GetEmployee(*employee.ManagerID)
		if err != nil {
			return models.Employee{}, fmt.Errorf("failed to get manager for employee: %v", err)
		}
		employee.Manager = &manager
	}

	// Получаем список подчиненных
	subordinates, err := GetSubordinates(employee.ID)
	if err != nil {
		return models.Employee{}, fmt.Errorf("failed to get subordinates: %v", err)
	}
	employee.Subordinates = subordinates

	return employee, nil
}

func UpdateEmployee(employee models.Employee) error {
	query := `UPDATE employees 
              SET first_name = $1, last_name = $2, position = $3, manager_id = $4, department_id = $5, 
                  role_id = $6, project_id = $7, city = $8, email = $9
              WHERE id = $10`
	_, err := config.DB.Exec(query, employee.FirstName, employee.LastName, employee.Position, employee.ManagerID, employee.DepartmentID, employee.RoleID, employee.ProjectID, employee.City, employee.Email, employee.ID)
	if err != nil {
		return fmt.Errorf("failed to update employee: %v", err)
	}
	return nil
}

func DeleteEmployee(id int) error {
	query := `DELETE FROM employees WHERE id = $1`
	_, err := config.DB.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete employee: %v", err)
	}
	return nil
}

// Функция для получения подчиненных сотрудника
// Функция для получения подчиненных сотрудника
func GetSubordinates(managerID int) ([]*models.Employee, error) {
	// SQL-запрос для получения сотрудников с определенным manager_id
	query := `SELECT id, first_name, last_name, position, manager_id, department_id, 
                     role_id, project_id, city, email, calendar_link
              FROM employees WHERE manager_id = $1`

	rows, err := config.DB.Query(query, managerID)
	if err != nil {
		return nil, fmt.Errorf("failed to get subordinates: %v", err)
	}
	defer rows.Close()

	var subordinates []*models.Employee // Изменили на указатели
	for rows.Next() {
		var subordinate models.Employee
		err := rows.Scan(&subordinate.ID, &subordinate.FirstName, &subordinate.LastName,
			&subordinate.Position, &subordinate.ManagerID, &subordinate.DepartmentID,
			&subordinate.RoleID, &subordinate.ProjectID, &subordinate.City,
			&subordinate.Email, &subordinate.CalendarLink)
		if err != nil {
			return nil, fmt.Errorf("failed to scan subordinate: %v", err)
		}

		// Добавляем указатель на подчиненного
		subordinates = append(subordinates, &subordinate)
	}

	// Дополнительно загружаем информацию о менеджерах каждого из подчиненных
	for i, subordinate := range subordinates {
		if subordinate.ManagerID != nil {
			manager, err := GetEmployee(*subordinate.ManagerID)
			if err != nil {
				return nil, fmt.Errorf("failed to get manager for subordinate %d: %v", subordinate.ID, err)
			}
			subordinates[i].Manager = &manager
		}
	}

	// Теперь подчиненные имеют информацию о менеджерах
	return subordinates, nil
}
