import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userReducer';
import axios from 'axios';
import { API_URL } from "../../utils/config";

import cn from 'classnames'
import s from './Login.module.css';


const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [notify, setNotify] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logIn = async () => {
		try {
			const response = await axios.post(`${API_URL}api/auth/login`, { login, password });

			const result = await response.data;
			dispatch(setUser(result.user));
			navigate('/');

		} catch (err) {
			setNotify(err.response.data.message);
		}
	}

	
	return (
		<>
			<div className={s.formLogin}>
				<input className={cn(s.input, s.inputLogin)} onChange={(e) => setLogin(e.target.value)} placeholder='Ваш логин или почта' />
				<input className={cn(s.input, s.inputPassword)} onChange={(e) => setPassword(e.target.value)} placeholder='Ваш пароль' />
				<div className={s.button} onClick={logIn}>Log in</div>
				<div className={s.notify}>{notify}</div>
			</div>
		</>
	);
}

export default Login;