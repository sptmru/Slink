import React from 'react';
import cn from 'classnames'
import s from './Auth.module.css';

const Auth = () => {

	return (
		<>
			<div className={s.auth}>
				<div className={s.auth_button}>Log in</div>
				<div className={cn(s.auth_button, s.auth_button_login)}>Join</div>
			</div>
		</>
	);
}

export default Auth;