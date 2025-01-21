// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReturnSign } from './blogApi';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user'),
  email: localStorage.getItem('email'),
  image: localStorage.getItem('image'),
  bio: localStorage.getItem('bio'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ReturnSign>) => {
      const { username: user } = action.payload;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', user);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('image', action.payload.image);
      localStorage.setItem('bio', action.payload.bio);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user,
        email: action.payload.email,
        image: action.payload.image,
        bio: action.payload.bio,
      };
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
