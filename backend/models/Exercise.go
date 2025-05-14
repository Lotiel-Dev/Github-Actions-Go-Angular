package models

import "gorm.io/gorm"

type Exercise struct {
	gorm.Model

	Title    string `grorm:"unique;not null"`
	Exercise string
	Solution string
	Level    int
}
