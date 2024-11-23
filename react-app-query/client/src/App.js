import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState(''); // name: состояние для хранения введенного имени, setName: функция для обновления состояния name
  const [message, setMessage] = useState(''); // message: состояние для хранения сообщения от сервера или сообщения об ошибке

  //handleInputChange: Функция, которая вызывается при изменении значения в поле ввода.
  // Она обновляет состояние name с текущим значением из поля ввода
  const handleInputChange = (event) => {
    setName(event.target.value);
  };
// handleSubmit: Функция, которая вызывается при отправке формы
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    if (name.trim() === '') {
      setMessage('Пожалуйста, заполните поле.'); // Сообщение об ошибке
      return; // Выходим из функции, если поле пустое
    }
//fetch: Метод для выполнения HTTP-запроса на сервер
    fetch(`http://localhost:8083/api/user?name=${encodeURIComponent(name)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Получаем текст ответа
      })
      .then(data => {
        setMessage(data); // Устанавливаем сообщение из ответа
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setMessage('Ошибка при получении данных');
      });
  };

  return (
    <div className="App">
      <h1>Приветствие</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={handleInputChange} 
          placeholder="Введите ваше имя" 
          required 
        />
        <button type="submit">Отправить</button>
      </form>
      {message && <h2>{message}</h2>} {/* Отображаем ответ от сервера */}
    </div>
  );
}

export default App;