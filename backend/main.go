package main

import (
	"log"
	"net/http"

	"github.com/Frosmin/backend/db"
	"github.com/Frosmin/backend/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	// migraciones para la base de datos
	db.Connect()
	// db.DB.AutoMigrate(models.User{})
	// db.DB.AutoMigrate(models.Exercise{})
	// db.DB.AutoMigrate(models.Tutorial{})
	// db.DB.AutoMigrate(models.Video{})

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.String(200, "Bienvenido a la API de Aprendizaje Python")
	})

	//simon
	api := r.Group("/api")
	//User
	api.GET("/users", routes.GetUsersHandler)
	api.GET("/user/:id", routes.GetUserHandler)
	api.POST("/user", routes.PostUserHandler)
	api.DELETE("/user/:id", routes.DeleteUserHandler)
	//Video
	api.GET("/videos", routes.GetVideosHandler)
	api.GET("/video/:id", routes.GetVideoHandler)
	api.POST("/video", routes.PostVideoHandler)
	api.GET("/videos20", routes.GetVideosHandler20)

	log.Println("Servidor escuchando en :8080")
	// log.Fatal(http.ListenAndServe(":8080", r))
	http.ListenAndServe(":8080", r)
}
