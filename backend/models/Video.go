package models

import "gorm.io/gorm"

type Video struct {
	gorm.Model

	Title string `grorm:"unique;not null"`
	Link  string
	Level int
}
