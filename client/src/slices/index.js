import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userReducer.js';

export default configureStore({
  reducer: {
    userStore: userReducer,
  },
});