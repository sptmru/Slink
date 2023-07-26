import React from 'react';
import './app.css';

const input = document.getElementById('input');
const readyLink = document.getElementById('readyLink');
const incorrect = document.getElementById('incorrect');

const urlPattern = new RegExp('^(https?://|www\\.)\\S+', 'i');

const sendText = async () => {
  const originalURL = input.value.trim();

  if (urlPattern.test(originalURL)) {
    try {
      const response = await fetch('http://127.0.0.1:5555/', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8'
        }),
        body: JSON.stringify({ longUrl: input.value })
      });

      const result = await response.json();
      readyLink.classList.remove('no-active');
      readyLink.innerText = result.message;

    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  } else {
    incorrect.classList.toggle('no-active');
    setTimeout(() => {
      incorrect.classList.toggle('no-active');
    }, "2800");
  }
}



function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="blockAboutService">
          <img src="../../public/logo.png" alt="Логотип" className="logo" />
          <p className="header_logo header_logo_name">hink</p>
          <p className="header_logo header_logo_about">- сервис получения коротких ссылок</p>
        </div>
        <div className="auth">
          <div className="auth_button">Log in</div>
          <div className="auth_button join">Join</div>
        </div>
        <div className="form">
          <input id="input" type="url" className="formText inputForUrl" />
          <div id="button" className="formText buttonSendUrl" onClick={sendText}>
            Click
          </div>
        </div>
        <div id="incorrect" className="incorrect no-active">Введите верную ссылку</div>
        <div id="readyLink" className="formText copyButton no-active">Готовая ссылка</div>
      </div>
    </div>
  );
}

export default App;
