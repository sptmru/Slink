import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/userReducer';
import s from './UserPanel.module.css';

import user_settings from "../../assets/user_settings.png";


const UserPanel = () => {
	const user = useSelector((state) => state.userStore.user);
	const dispatch = useDispatch();


	return (
		<>
			<div className={s.panel}>
				<div className={s.user_name}>{user.name}</div>
				<img src={user_settings} alt="button_settings" className={s.icon} />
				<div className={s.panel_button}
					onClick={() => {
						dispatch(logoutUser())
					}}
				>Exit</div>
			</div>
		</>
	);
}

export default UserPanel;