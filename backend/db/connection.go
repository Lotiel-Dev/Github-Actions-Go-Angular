package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=dpg-d078tkk9c44c739pp6kg-a.oregon-postgres.render.com user=simon password=2ITO0Za60IKbNPmkO3sqlXKKoCwcYAC2 dbname=generacion_postgres port=5432"

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	} else {
		println("Connected to database")
	}
}

// dpg-d078tkk9c44c739pp6kg-a.oregon-postgres.render.com
