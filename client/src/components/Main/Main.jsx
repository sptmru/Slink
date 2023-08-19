import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from "../../utils/config";
import cn from 'classnames';
import s from './Main.module.css';


const Main = () => {
	const [isCorrect, setCorrect] = useState(false);
	const [isActive, setActive] = useState(false);
	const [isInput, setInput] = useState('');
	const [shortUrl, setShortUrl] = useState('');
	const [warning, setWarning] = useState('');

	const user = useSelector((state) => state.userStore.user);

	const urlPattern = new RegExp('^(https?://|www\\.)\\S+', 'i');

	const handleCopyClick = () => {
		try {
			const textArea = document.createElement('textarea');
			textArea.value = shortUrl;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			pushWarning('Link copied')
		} catch (err) {
			console.error('Failed to copy data: ', err);
		}
	};

	const pushWarning = (text) => {
		setWarning(text);
		setCorrect(true);
		setTimeout(() => {
			setCorrect(false);
		}, "2800");
	}

	const sendText = async () => {
		const original_url = isInput.trim();

		if (urlPattern.test(original_url)) {
			try {
				const response = await axios.post(API_URL, { 
					original_url: original_url, 
					id: user ? user.id : undefined 
				});
				const result = await response.data;
				console.log(result);
				setActive(true);
				setShortUrl(result.message);

			} catch (error) {
				console.error('An error has occurred:', error);
			}
		} else {
			pushWarning('Enter the correct link');
			setActive(false);
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
				{warning}
			</div>
			<div className={cn(s.formText, s.copyButton, { [s.no_active]: isActive === false })} onClick={handleCopyClick}>
				{shortUrl}
			</div>
		</>
	);
}

export default Main;