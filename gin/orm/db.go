package orm

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Db *gorm.DB

func InitDB() {
	fmt.Print("Init Database")
	//เชื่อม mysql "root:<password>@tcp(127.0.0.1:3306)/<dbName>?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := "root:0858463561@tcp(127.0.0.1:3306)/test?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&User{})
	Db = db
}

func Hello() {

	fmt.Print("Hello")
}
