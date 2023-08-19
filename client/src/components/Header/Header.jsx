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
				<img src={logo} alt='Service logo' className={s.logo} onClick={() => navigate('/')} />
				<p className={cn(s.header_logo, s.header_logo_name)}>link</p>
				<p className={cn(s.header_logo, s.header_logo_about)}>- service for creating short links</p>
			</div>
		</>
	);
}

export default Header;