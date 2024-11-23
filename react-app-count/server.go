package main

import (
	"fmt"
	"net/http"
	"strconv"
)

var counter = 0

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == "GET" {
		w.Write([]byte(strconv.Itoa(counter)))
		return
	} else if r.Method == "POST" {
		r.ParseForm()                // в POST предаются данные, собираем их в структуру, доступную через r.Form
		count := r.Form.Get("count") //получаем значение по ключу count
		if countInt, err := strconv.Atoi(count); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Это не число"))
			return
		} else {
			counter += countInt
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(strconv.Itoa(counter)))
			return
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("этот метод не разрешен"))
		return
	}

}

func main() {
	http.HandleFunc("/count", handler)
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("error")
	}
}
