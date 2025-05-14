package models

import "gorm.io/gorm"

type Tutorial struct {
	gorm.Model

	Title       string `grorm:"unique;not null"`
	Description string
	Level       int
}
