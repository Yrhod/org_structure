package models

type Employee struct {
	ID             int         `json:"id"`
	FirstName      string      `json:"first_name"`
	LastName       string      `json:"last_name"`
	Position       string      `json:"position"`
	DepartmentID   int         `json:"department_id"`
	DepartmentName string      `json:"department_name,omitempty"` // Название департамента
	RoleID         int         `json:"role_id"`
	RoleName       string      `json:"role_name,omitempty"` // Название роли
	ProjectID      int         `json:"project_id"`
	ProjectName    string      `json:"project_name,omitempty"` // Название проекта
	ManagerID      *int        `json:"manager_id"`
	City           string      `json:"city"`
	Phone          *string     `json:"phone"`
	Email          string      `json:"email"`
	CalendarLink   string      `json:"calendar_link"`
	Manager        *Employee   `json:"manager,omitempty"`
	Subordinates   []*Employee `json:"subordinates,omitempty"`
}
