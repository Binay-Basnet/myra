import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface AuthenticatePayload {
  user: { name: string; email: string };
  token: string;
}

// Define a type for the slice state
interface AuthState {
  user: { name: string; email: string } | null;
  isLogged: boolean | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isLogged: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    authenticate: (state, action: PayloadAction<{ user: { name: string; email: string } }>) => {
      state.user = action.payload.user;
      state.isLogged = true;
    },
    login: (state, action: PayloadAction<AuthenticatePayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
    },
    logout: (state) => {
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.token = null;
      state.isLogged = false;
      // state = initialState;
    },
  },
});

export const { authenticate, logout, saveToken, login } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
