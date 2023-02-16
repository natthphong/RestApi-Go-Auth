package main

import (
	"fmt"
	"net/http"
	"tar/jwt-api/orm"
	Auth "tar/jwt-api/routes/auth"
	"tar/jwt-api/routes/middleware"
	"tar/jwt-api/routes/user"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Print("Error loading .env file")
	}
	orm.InitDB()

	r := gin.Default()
	r.Use(cors.Default())
	r.StaticFS("/file", http.Dir("public"))
	//สำหรับผู้ใช้
	authorized := r.Group("/user", middleware.Logger())
	authorized.GET("/viewUser", user.ReadAll)
	authorized.GET("/Profile", user.Profile)
	authorized.PUT("/Update/:id", user.Update)
	authorized.DELETE("/Delete/:id", user.Delete)
	authorized.POST("/Upload", user.Upload)
	authorized.POST("/Logout", Auth.Logout)
	authorized.POST("/Auth", user.Auth)

	r.GET("/", Auth.Home)
	///router register
	r.POST("/register", Auth.Register)
	r.POST("/login", Auth.Login)

	r.Run("localhost:9999") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
