package models

type Employee struct {
	ID           int         `json:"id"`                     // ID сотрудника
	FirstName    string      `json:"first_name"`             // Имя сотрудника
	LastName     string      `json:"last_name"`              // Фамилия сотрудника
	Position     string      `json:"position"`               // Должность сотрудника
	DepartmentID int         `json:"department_id"`          // ID департамента сотрудника
	RoleID       int         `json:"role_id"`                // ID роли сотрудника
	ProjectID    int         `json:"project_id"`             // ID проекта, на котором работает сотрудник
	ManagerID    *int        `json:"manager_id"`             // ID менеджера (если есть)
	City         string      `json:"city"`                   // Город сотрудника
	Phone        string      `json:"phone"`                  // Номер телефона сотрудника
	Email        string      `json:"email"`                  // Электронная почта сотрудника
	CalendarLink string      `json:"calendar_link"`          // Ссылка на календарь сотрудника
	Manager      *Employee   `json:"manager,omitempty"`      // Менеджер сотрудника
	Subordinates []*Employee `json:"subordinates,omitempty"` // Подчиненные сотрудника
}
