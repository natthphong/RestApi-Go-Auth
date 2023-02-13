package user

import (
	"fmt"
	"net/http"
	"os"
	"tar/jwt-api/orm"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	_ "github.com/golang-jwt/jwt/v4"
)

func ReadAll(c *gin.Context) {
	bool := Vertifly(c)
	fmt.Print(bool)
	if bool == "NotLogin" {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "not login"})
		return
	} else if bool == "Cookie incorrect" {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Cookie incorrect"})
		return
	}

	var users []orm.User
	orm.Db.Find(&users)

	c.JSON(http.StatusAccepted, gin.H{"status": "ok", "message": "View ALL", "Users": users})
}

func Vertifly(c *gin.Context) string {
	hmacSampleSecret := []byte(os.Getenv("JWT_KEY"))
	cookie, err := c.Cookie("Tarken")
	if err != nil {
		//c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "not login"})
		return "NotLogin"
	}
	token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return hmacSampleSecret, nil
	})
	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return "Success"
	} else {
		return "Cookie incorrect"
	}

}
