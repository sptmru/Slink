import React from 'react';
import s from './Link.module.css';


const Link = ({ link }) => {
	const createdDate = new Date(link.created_at);
	const year = createdDate.getFullYear();
	const month = createdDate.toLocaleString('en-US', { month: 'short' }).replace('.', '');
	const day = createdDate.getDate();


	return (
		<>
			<div className={s.link}>
				<div className={s.shortlink}>{link.short_url}</div>
				<div className={s.originlink}>{link.original_url}</div>
				<div className={s.date}>{`${day} ${month} ${year}`}</div>
			</div>
		</>
	);
}

export default Link;