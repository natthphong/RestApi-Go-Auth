package user

import (
	"net/http"
	"tar/jwt-api/orm"

	"github.com/gin-gonic/gin"
	_ "github.com/golang-jwt/jwt/v4"
)

func ReadAll(c *gin.Context) {

	var users []orm.User
	orm.Db.Find(&users)

	c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "View ALL", "Users": users})
}

func Profile(c *gin.Context) {

	username := c.MustGet("username").(string)

	var user orm.User
	orm.Db.Where("Username = ?", username).Find(&user)

	c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "Profile", "username": username, "User": user})
}

func Update(c *gin.Context) {

	var json orm.User

	if err := c.BindJSON(&json); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	userId := c.MustGet("userId").(float64)
	var user orm.User
	orm.Db.Where("id = ?", userId).Find(&user)
	orm.Db.Model(&user).Updates(orm.User{Username: json.Username, Password: json.Password, Fullname: json.Fullname, Avatar: json.Avatar})
	c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "Update", "user": user.Admin})

}
