import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthenticatePayload {
  accessToken: string;
  refreshToken: string;
  email: string;
  user_id: string;
}

// Define a type for the slice state
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  isLogged: boolean | null;
  email: string | null;
  user_id: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isLogged: false,
  email: null,
  user_id: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticatePayload>) => {
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
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
      state.email = action.payload.email;
      state.user_id = action.payload.user_id;
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

export const { authenticate, login, logout, saveToken } = authSlice.actions;

export default authSlice.reducer;
