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

	var user []orm.User
	orm.Db.Where("Username = ?", username).Find(&user)

	c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "View ALL", "username": username, "User": user})
}
