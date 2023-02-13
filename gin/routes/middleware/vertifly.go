package middleware

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	_ "github.com/golang-jwt/jwt/v4"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		hmacSampleSecret := []byte(os.Getenv("JWT_KEY"))
		cookie, err := c.Cookie("Tarken")
		if err != nil {
			//c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "not login"})
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": "error", "message": "not login"})
		}
		token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			return hmacSampleSecret, nil
		})
		if Claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("userId", Claims["userId"])
			c.Set("username", Claims["username"])
		} else {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Cookie Incorect"})
		}
		c.Next()
	}
}
