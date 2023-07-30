import React from 'react';
import cn from 'classnames'
import s from './Registration.module.css';

const Registration = () => {
	return (
		<>
			<div className={s.formRegistration}>
				<input className={cn(s.input, s.inputLogin)} placeholder='Придумайте логин' />
				<input className={cn(s.input, s.inputMail)} placeholder='Ваша почта' />
				<input className={cn(s.input, s.inputPassword)} placeholder='Придумайте пароль' />
				<div className={s.button}>Join</div>
			</div>
		</>
	);
}

export default Registration;