import React, { useState } from 'react';
import axios from 'axios';
import {API_URL} from "../../utils/config";
import cn from 'classnames'
import s from './Registration.module.css';


const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [notify, setNotify] = useState('');

	const registration = async () => {
		try {
			const res = await axios.post(`${API_URL}api/auth/registration`, { name: name, email: email, password: password });

			const result = await res.data;
			setNotify(result.message);

		} catch (err) {
			setNotify(err.response.data.message);
		}
	}

	
	return (
		<>
			<div className={s.formRegistration}>
				<input onChange={(e) => setName(e.target.value)} className={cn(s.input, s.inputLogin)} placeholder='Come up with a login' />
				<input onChange={(e) => setEmail(e.target.value)}  className={cn(s.input, s.inputMail)} placeholder='Your mail' />
				<input onChange={(e) => setPassword(e.target.value)}  className={cn(s.input, s.inputPassword)} placeholder='Come up with a password' />
				<div className={s.button} onClick={registration}>Join</div>
				<div className={s.notify}>{notify}</div>
			</div>
		</>
	);
}

export default Registration;