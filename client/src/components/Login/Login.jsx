import React, { useState } from 'react';
import cn from 'classnames'
import s from './Login.module.css';

const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	
	return (
		<>
			<div className={s.formLogin}>
				<input className={cn(s.input, s.inputLogin)} onChange={(e) => setLogin(e.target.value)} placeholder='Ваш логин или почта' />
				<input className={cn(s.input, s.inputPassword)} onChange={(e) => setPassword(e.target.value)} placeholder='Ваш пароль' />
				<div className={s.button}>Log in</div>
			</div>
		</>
	);
}

export default Login;