import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './App.module.css';

import Header from './Header/Header';
import Auth from './Auth/Auth';
import Main from './Main/Main';
import UserLinks from './UserLinks/UserLinks';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import UserPanel from './UserPanel/UserPanel';


const App = () => {
  const user = useSelector((state) => state.userStore.user);

  return (
    <BrowserRouter>
      <div className={s.App}>
        <Header />
        {user ? <UserPanel /> : <Auth />}

        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/links" element={<UserLinks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;