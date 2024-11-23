package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Разрешить все источники
	name := r.URL.Query().Get("name")
	ans := "Hello, " + name + "!"
	w.Write([]byte(ans))
}

func main() {
	http.HandleFunc("/api/user", handler)
	err := http.ListenAndServe(":8083", nil)
	if err != nil {
		fmt.Println("error")
	}

}
