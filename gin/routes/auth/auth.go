package auth

import (
	"net/http"
	"tar/jwt-api/orm"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type RegisterBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Fullname string `json:"fullname" binding:"required"`
	Avatar   string `json:"avatar" binding:"required"`
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

func Home(c *gin.Context) {

	orm.Hello()
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Hello world"})

}
