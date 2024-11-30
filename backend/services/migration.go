package services

import (
	"fmt"
	"org_structure_backend/config"
)

func Migrate() {
	query := `
        -- Создание таблицы департаментов
        CREATE TABLE IF NOT EXISTS departments (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
        );
        
        -- Создание таблицы ролей
        CREATE TABLE IF NOT EXISTS roles (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE,
            description TEXT
        );
        
        -- Создание таблицы проектов
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            start_date DATE,
            end_date DATE
        );
        
        -- Создание таблицы сотрудников
        CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            position VARCHAR(100) NOT NULL,
            department_id INT REFERENCES departments(id),
            role_idц INT REFERENCES roles(id),
            project_id INT REFERENCES projects(id),
            manager_id INT REFERENCES employees(id),
            city VARCHAR(100),
            email VARCHAR(100),
            calendar_link VARCHAR(200),
            CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE SET NULL
        );

        -- Индексы для быстрого поиска сотрудников по департаменту, роли, проекту и менеджеру
        CREATE INDEX IF NOT EXISTS idx_employee_department ON employees(department_id);
        CREATE INDEX IF NOT EXISTS idx_employee_role ON employees(role_id);
        CREATE INDEX IF NOT EXISTS idx_employee_project ON employees(project_id);
        CREATE INDEX IF NOT EXISTS idx_employee_manager ON employees(manager_id);
    `
	_, err := config.DB.Exec(query)
	if err != nil {
		panic(fmt.Sprintf("Failed to run migrations: %v", err))
	}
	fmt.Println("Database migrations applied successfully")
}
