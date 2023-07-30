import React from 'react';
import s from './App.module.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Auth from './Auth/Auth';
import Main from './Main/Main';
import Login from './Login/Login';
import Registration from './Registration/Registration';


const App = () => {

  return (
    <BrowserRouter>
      <div className={s.App}>
        <Header />
        <Auth />

        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;