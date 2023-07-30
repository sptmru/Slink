import React from 'react';
import { useNavigate } from "react-router-dom";
import cn from 'classnames'
import s from './Auth.module.css';

const Auth = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className={s.auth}>
				<div className={s.auth_button} onClick={() => navigate('/login')}>Log in</div>
				<div className={cn(s.auth_button, s.auth_button_login)} onClick={() => navigate('/registration')}>Join</div>
			</div>
		</>
	);
}

export default Auth;