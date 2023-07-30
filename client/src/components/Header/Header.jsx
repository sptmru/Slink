import React from 'react';
import { useNavigate } from "react-router-dom";
import cn from 'classnames'
import s from './Header.module.css';
import logo from "../../assets/logo.png";


const Header = () => {
	const navigate = useNavigate();


	return (
		<>
			<div className={s.blockAboutService}>
				<img src={logo} alt='Логотип сервиса' className={s.logo} onClick={() => navigate('/')} />
				<p className={cn(s.header_logo, s.header_logo_name)}>link</p>
				<p className={cn(s.header_logo, s.header_logo_about)}>- сервис получения коротких ссылок</p>
			</div>
		</>
	);
}

export default Header;