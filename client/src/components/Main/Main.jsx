import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../utils/config";
import cn from 'classnames';
import s from './Main.module.css';

const Main = () => {
	const [isCorrect, setCorrect] = useState(false);
	const [isActive, setActive] = useState(false);
	const [isInput, setInput] = useState('');
	const [shortUrl, setShortUrl] = useState('')

	const urlPattern = new RegExp('^(https?://|www\\.)\\S+', 'i');

	const sendText = async () => {
		const originalURL = isInput.trim();

		if (urlPattern.test(originalURL)) {
			try {
				const response = await axios.post(API_URL, { longUrl: originalURL });

				const result = await response.data;
				setActive(true);
				setShortUrl(result.message);

			} catch (error) {
				console.error('Произошла ошибка:', error);
			}
		} else {
			setCorrect(true);
			setActive(false);
			setTimeout(() => {
				setCorrect(false);
			}, "2800");
		}
	}


	return (
		<>
			<div className={s.form}>
				<input onChange={(e) => setInput(e.target.value)} className={cn(s.formText, s.inputForUrl)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							sendText();
						}
					}} />
				<div className={cn(s.formText, s.buttonSendUrl)} onClick={sendText}>
					Go!
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