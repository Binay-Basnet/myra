import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@coop/shared/data-access';

import type { RootState } from './store';

type AuthType = Partial<{
  user: Partial<User>;
  accessToken: string;
}>;
// Define a type for the slice state
interface AuthState {
  auth: AuthType;
  isLogged: boolean | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  auth: {},
  isLogged: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    authenticate: (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
