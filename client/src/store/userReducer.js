import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('authUser'));
const addAuthUser = (user) => localStorage.setItem('authUser', JSON.stringify(user));

const links = JSON.parse(localStorage.getItem('userLinks'));
const addUserLinks = (links) => localStorage.setItem('userLinks', JSON.stringify(links));

const initialState = {
	  user: user,
	  links: links,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			addAuthUser(state.user);
		},
		logoutUser: (state) => {
			state.user = null;
			addAuthUser(state.user);
		},
		setLinks: (state, action) => {
			state.links = action.payload;
			addUserLinks(state.links);
		},
	},
});

export const { setUser, logoutUser, setLinks } = userSlice.actions;

export default userSlice.reducer;