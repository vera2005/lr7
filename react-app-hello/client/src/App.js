import React, { useEffect, useState } from 'react';
import './index.css'; // Импортируем CSS
function App() {
  const [message, setMessage] = useState('');
// определение компонента App - основа приложения
// message - состояние, setMessage - функция для его обновления
  useEffect(() => {
    //useEffect позволяет выполнять побочные эффекты
    fetch('http://localhost:8082/get')
    //fetch - метод для выполнения http запроса
      .then(response => response.text())//response.text(): Преобразует ответ в текст.
      .then(data => setMessage(data))//setMessage(data): Обновляет состояние message с полученными данными.
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;