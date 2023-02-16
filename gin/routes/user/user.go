package user

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"tar/jwt-api/orm"

	"github.com/gin-gonic/gin"
	_ "github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
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
	fmt.Print("Update")
	var json orm.User
	message := "Update Already"
	status := "ok"
	if err := c.BindJSON(&json); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	var userExit orm.User
	orm.Db.Where("username = ?", json.Username).First(&userExit)

	enPass, _ := bcrypt.GenerateFromPassword([]byte(json.Password), 10)
	userId := c.Param("id")
	fmt.Print(userId)
	var user orm.User
	orm.Db.Where("id = ?", userId).Find(&user)
	fmt.Print(user)
	if userExit.ID > 0 {
		json.Username = user.Username
		message = "Update but Username Already used"
		status = "okBut"
	}

	fmt.Print(json.Username)
	orm.Db.Model(&user).Updates(orm.User{Username: json.Username, Password: string(enPass), Fullname: json.Fullname, Avatar: json.Avatar})

	c.JSON(http.StatusAccepted, gin.H{"status": status, "message": message, "user": user})

}

func Delete(c *gin.Context) {
	/*user := c.MustGet("user")
	fmt.Printf("type of user is %T\n", user)*/
	Admin := c.MustGet("admin")
	userId := c.Param("id")
	var user orm.User
	orm.Db.Where("id = ?", userId).Find(&user)
	if Admin == false {
		c.JSON(http.StatusAccepted, gin.H{"status": "err", "message": "Not Admin"})
	} else if user.ID > 0 {
		orm.Db.Unscoped().Delete(&user)
		c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "Delete", "Delete user": user})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"status": "err", "message Not Found UserId ": userId})
	}

}

func Upload(c *gin.Context) {
	file, header, err := c.Request.FormFile("Avatar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "err", "message ": err.Error()})
	}
	fileName := header.Filename

	out, err := os.Create("public/" + fileName)

	if err != nil {
		fmt.Print(err.Error())
	}
	defer out.Close()

	_, err = io.Copy(out, file)

	if err != nil {
		fmt.Print(err.Error())
	}

	var avatar string
	avatar = "http://localhost:9999/file/" + fileName

	//save
	userId := c.MustGet("userId")
	var user orm.User
	orm.Db.Where("id = ?", userId).Find(&user)
	user.Avatar = avatar
	orm.Db.Save(user)
	c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "Delete", "avatar": avatar})
}

func Auth(c *gin.Context) {

	c.JSON(http.StatusAccepted, gin.H{"status": "ok"})
}
