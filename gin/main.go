package main

import (
	"tar/jwt-api/orm"
	Auth "tar/jwt-api/routes/auth"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// model register
type Register struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Fullname string `json:"fullname" binding:"required"`
	Avatar   string `json:"avatar" binding:"required"`
}

// model user
type User struct {
	gorm.Model
	Username string
	Password string
	Fullname string
	Avatar   string
}

func main() {
	orm.InitDB()
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/", Auth.Home)
	///router register
	r.POST("/register", Auth.Register)

	r.Run("localhost:9999") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
