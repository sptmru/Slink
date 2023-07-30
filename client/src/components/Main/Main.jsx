import React, { useState } from 'react';
import axios from 'axios'
import cn from 'classnames'
import s from './Main.module.css';

const Main = () => {
	const [isCorrect, setCorrect] = useState(false);
	const [isActive, setActive] = useState(false);
	const [isInput, setInput] = useState('');
	const [shortUrl, setShortUrl] = useState('')

	const handleCorrect = (value) => {
		setCorrect(value);
	}
	const handleActive = (value) => {
		setActive(value);
	}

	const urlPattern = new RegExp('^(https?://|www\\.)\\S+', 'i');

	const sendText = async () => {
		const originalURL = isInput.trim();

		if (urlPattern.test(originalURL)) {
			try {
				const response = await axios.post('http://127.0.0.1:5555/', { longUrl: originalURL });
				console.log(response);

				const result = await response.data;
				handleActive(true);
				setShortUrl(result.message);

			} catch (error) {
				console.error('Произошла ошибка:', error);
			}
		} else {
			handleCorrect(true);
			handleActive(false);
			setTimeout(() => {
				handleCorrect(false);
			}, "2800");
		}
	}


	return (
		<>
			<div className={s.form}>
				<input onChange={(e) => setInput(e.target.value)} className={cn(s.formText, s.inputForUrl)} />
				<div className={cn(s.formText, s.buttonSendUrl)} onClick={sendText}>
					Click
				</div>
			</div>
			<div className={cn(s.incorrect, { [s.no_active]: isCorrect === false })}>
				Введите верную ссылку
			</div>
			<div className={cn(s.formText, s.copyButton, { [s.no_active]: isActive === false })}>
				{shortUrl}
			</div>
		</>
	);
}

export default Main;