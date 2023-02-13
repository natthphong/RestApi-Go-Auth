package auth

import (
	"fmt"
	"net/http"
	"os"
	"tar/jwt-api/orm"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	_ "github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

var hmacSampleSecret []byte

type RegisterBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Fullname string `json:"fullname" binding:"required"`
	Avatar   string `json:"avatar" binding:"required"`
}

type LoginBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {

	//ประกาศ json เป็น model register
	var json RegisterBody

	//รับJSON จาก body ลง json ที่ประกาศ
	if err := c.BindJSON(&json); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	//เช็ค username
	var userExit orm.User
	orm.Db.Where("username = ?", json.Username).First(&userExit)
	if userExit.ID > 0 {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "Register Already"})
		return
	}

	//เข้ารหัส
	enPass, _ := bcrypt.GenerateFromPassword([]byte(json.Password), 10)
	user := orm.User{Username: json.Username, Password: string(enPass), Fullname: json.Fullname, Avatar: json.Avatar}
	orm.Db.Create(&user)
	if user.ID > 0 {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "User Create Success", "userId": user.ID})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "User Create Failed"})
	}

}

func Login(c *gin.Context) {
	var json LoginBody
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "error": err.Error()})
		return
	}
	var userExit orm.User
	orm.Db.Where("username = ?", json.Username).First(&userExit)
	if userExit.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "User Does Not Exists"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(userExit.Password), []byte(json.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Login Failed"})
		return
	}
	hmacSampleSecret = []byte(os.Getenv("JWT_KEY"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": userExit.ID,
	})
	tokenString, err := token.SignedString(hmacSampleSecret)
	t := http.Cookie{Name: "Tarken", Value: tokenString, Expires: time.Now().Add(1 * time.Minute), HttpOnly: true}
	http.SetCookie(c.Writer, &t)
	fmt.Println(tokenString, err)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Login Success", "token": tokenString})
}

func Home(c *gin.Context) {

	orm.Hello()
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Hello world"})

}
