package models

type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
}
