import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { EmployeeUser } from '../../generated/graphql';

interface AuthenticatePayload {
  user: Partial<EmployeeUser>;
  accessToken: string;
  refreshToken: string;
}

// Define a type for the slice state
interface AuthState {
  user: Partial<EmployeeUser> | null;

  accessToken: string | null;
  refreshToken: string | null;

  isLogged: boolean | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,

  accessToken: null,
  refreshToken: null,
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    authenticate: (
      state,
      action: PayloadAction<Omit<AuthenticatePayload, 'accessToken' | 'refreshToken'>>
    ) => {
      state.user = action.payload.user;
      state.isLogged = true;
    },

    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('refreshToken');
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      state = initialState;
    },
  },
});

export const { authenticate, logout, saveToken } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
