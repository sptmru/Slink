import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('authUser'));
const addAuthUser = (user) => localStorage.setItem('authUser', JSON.stringify(user));

const initialState = {
	  user: user,
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
	},
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;