import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Функция для получения текущего значения счетчика
  const fetchCounter = () => {
    fetch('http://localhost:8081/count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        return response.text();
      })
      .then(data => {
        setCounter(parseInt(data)); // Устанавливаем текущее значение счетчика
        setErrorMessage(''); // Сбрасываем сообщение об ошибке
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка при получении данных');
      });
  };

  // Получаем значение счетчика при загрузке компонента
  useEffect(() => {
    fetchCounter();
  }, []);

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    fetch('http://localhost:8081/count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ count: inputValue }), // Форматируем данные для отправки
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при обновлении счетчика');
        }
        return response.text();
      })
      .then(data => {
        setCounter(parseInt(data)); // Устанавливаем новое значение счетчика
        setInputValue(''); // Очищаем поле ввода
        setErrorMessage(''); // Сбрасываем сообщение об ошибке
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrorMessage('Ошибка при обновлении счетчика');
      });
  };

  return (
    <div className="App">
      <h1>Счетчик: {counter}</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Введите число" 
          required 
        />
        <button type="submit">Добавить</button>
      </form>
      {errorMessage && <h2 style={{ color: 'red' }}>{errorMessage}</h2>} {/* Отображаем сообщение об ошибке */}
    </div>
  );
}

export default App;