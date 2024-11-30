package services

import (
	"database/sql"
	"fmt"
	"org_structure_backend/config"
	"org_structure_backend/models"
)

func CreateEmployee(employee models.Employee) (int, error) {
	query := `INSERT INTO employees (first_name, last_name, position, manager_id, department_id, role_id, project_id, city, phone, email, calendar_link)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`
	var id int
	err := config.DB.QueryRow(query, employee.FirstName, employee.LastName, employee.Position, employee.ManagerID, employee.DepartmentID, employee.RoleID, employee.ProjectID, employee.City, employee.Phone, employee.Email, employee.CalendarLink).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("failed to create employee: %v", err)
	}
	return id, nil
}

func SearchEmployees(filterType, filterValue string) ([]models.Employee, error) {
	var query string
	var args []interface{}
	argCount := 0

	// Определяем SQL-запрос в зависимости от типа фильтра
	switch filterType {
	case "department":
		// Запрос для поиска сотрудников по имени департамента
		query = `SELECT e.id, e.first_name, e.last_name, e.position, e.manager_id, e.department_id, 
                         e.role_id, e.project_id, e.city, e.phone, e.email, e.calendar_link
                  FROM employees e
                  JOIN departments d ON e.department_id = d.id
                  WHERE d.name = $1`
		argCount++
		args = append(args, filterValue)
	case "role":
		query = `SELECT id FROM roles WHERE name = $1`
		argCount++
		args = append(args, filterValue)
	case "project":
		query = `SELECT id FROM projects WHERE name = $1`
		argCount++
		args = append(args, filterValue)
	case "position", "city", "phone", "email":
		// Простые фильтры без преобразования
		query = fmt.Sprintf(`SELECT id, first_name, last_name, position, manager_id, department_id, role_id, project_id, city, phone, email, calendar_link
                             FROM employees WHERE %s = $1`, filterType)
		argCount++
		args = append(args, filterValue)
	case "name":
		// Фильтр по имени (имя + фамилия)
		query = `SELECT id, first_name, last_name, position, manager_id, department_id, role_id, project_id, city, phone, email, calendar_link
                 FROM employees WHERE CONCAT(first_name, ' ', last_name) ILIKE $1`
		argCount++
		args = append(args, "%"+filterValue+"%")
	default:
		return nil, fmt.Errorf("unsupported filter type: %s", filterType)
	}

	// Выполняем запрос
	rows, err := config.DB.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer rows.Close()

	// Список сотрудников
	var employees []models.Employee
	for rows.Next() {
		var employee models.Employee
		err := rows.Scan(
			&employee.ID,
			&employee.FirstName,
			&employee.LastName,
			&employee.Position,
			&employee.ManagerID,
			&employee.DepartmentID,
			&employee.RoleID,
			&employee.ProjectID,
			&employee.City,
			&employee.Phone,
			&employee.Email,
			&employee.CalendarLink,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan employee: %v", err)
		}
		employees = append(employees, employee)
	}

	return employees, nil
}

func GetEmployee(id int) (models.Employee, error) {
	query := `
        SELECT 
            e.id, e.first_name, e.last_name, e.position, e.manager_id, e.department_id, 
            d.name AS department_name, e.role_id, r.name AS role_name, 
            e.project_id, p.name AS project_name, 
            e.city, e.phone, e.email, e.calendar_link
        FROM employees e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN roles r ON e.role_id = r.id
        LEFT JOIN projects p ON e.project_id = p.id
        WHERE e.id = $1
    `

	var employee models.Employee
	err := config.DB.QueryRow(query, id).Scan(
		&employee.ID, &employee.FirstName, &employee.LastName, &employee.Position,
		&employee.ManagerID, &employee.DepartmentID, &employee.DepartmentName,
		&employee.RoleID, &employee.RoleName, &employee.ProjectID, &employee.ProjectName,
		&employee.City, &employee.Phone, &employee.Email, &employee.CalendarLink,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.Employee{}, fmt.Errorf("employee not found")
		}
		return models.Employee{}, fmt.Errorf("failed to get employee: %v", err)
	}

	return employee, nil
}

func UpdateEmployee(employee models.Employee) error {
	query := `UPDATE employees 
              SET first_name = $1, last_name = $2, position = $3, manager_id = $4, department_id = $5, 
                  role_id = $6, project_id = $7, city = $8, phone = $9, email = $10
              WHERE id = $11`
	_, err := config.DB.Exec(query, employee.FirstName, employee.LastName, employee.Position, employee.ManagerID, employee.DepartmentID, employee.RoleID, employee.ProjectID, employee.City, employee.Phone, employee.Email, employee.ID)
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
func GetSubordinates(managerID int) ([]*models.Employee, error) {
	// SQL-запрос для получения сотрудников с определенным manager_id
	query := `SELECT id, first_name, last_name, position, manager_id, department_id, 
                     role_id, project_id, city, phone, email, calendar_link
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
			&subordinate.Phone, &subordinate.Email, &subordinate.CalendarLink)
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
