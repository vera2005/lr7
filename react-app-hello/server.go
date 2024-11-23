package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Разрешить все источники
	w.Write([]byte("Hello web!"))

}

func main() {
	http.HandleFunc("/get", handler)         // регистрация обработчика для пути "/get"
	err := http.ListenAndServe(":8082", nil) // запуск сервера на порту 8082
	if err != nil {
		fmt.Println("error")
	}
}
