import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLinks } from '../../store/userReducer';
import s from './UserLinks.module.css';
import { API_URL } from "../../utils/config";
import Link from './Link/Link';


const UserLinks = () => {
	const dispatch = useDispatch();
	const userId = useSelector(state => state.userStore.user.id);
	const links = useSelector(state => state.userStore.links);

	useEffect(() => {
		const params = {
			id: userId
		}

		const getLinks = async (userId) => {
			try {
				const response = await axios.get(`${API_URL}api/links`, { params });
				const result = await response.data;
				dispatch(setLinks(result.message));
			} catch (error) {
				console.error('An error has occurred:', error.message);
			}
		}
		getLinks();
	}, [dispatch, userId])


	return (
		<>
			<div className={s.links}>
				<div className={s.title}>Link creation history</div>

				{Array.isArray(links) && links.length > 0 ?
					(links.map((link) => <Link key={link.id} link={link} />))
					:
					(<div className={s.warning}>This user has not created short links yet</div>)}


				<div className={s.annotation}>The links of registered users are deleted automatically 3 months after creation</div>
			</div>
		</>
	);
}

export default UserLinks;