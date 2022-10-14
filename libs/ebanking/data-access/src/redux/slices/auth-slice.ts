import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EbankingCooperative, EbankingUser } from '@coop/ebanking/data-access';

import type { RootState } from '../store';

interface AuthenticatePayload {
  user: Partial<EbankingUser>;
  token: string;
}

interface CoopAuthenticatePayload {
  user: Partial<EbankingCooperative>;
  token: string;
}

// Define a type for the slice state
interface AuthState {
  currentToken: 'MYRA' | 'COOP';

  user: Partial<EbankingUser> | null;
  isLogged: boolean | null;
  token: string | null;

  cooperative: {
    isLogged: boolean | null;

    user: Partial<EbankingCooperative> | null;
    token: string | null;
  };
}

// Define the initial state using that type
const initialState: AuthState = {
  currentToken: 'MYRA',
  user: null,
  isLogged: null,
  token: null,
  cooperative: {
    isLogged: null,
    user: null,
    token: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentToken: (state, action: PayloadAction<'MYRA' | 'COOP'>) => {
      state.currentToken = action.payload;
    },

    saveToken: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    authenticate: (state, action: PayloadAction<{ user: Partial<EbankingUser> }>) => {
      state.user = action.payload.user;
      state.isLogged = true;
    },
    login: (state, action: PayloadAction<AuthenticatePayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.isLogged = false;
      state.cooperative.token = null;
      state.cooperative.user = null;
      state.cooperative.isLogged = false;
      // state = initialState;
    },

    saveCoopToken: (state, action) => {
      state.cooperative.token = action.payload;
      state.cooperative.isLogged = true;
    },

    switchCooperative: (state, action: PayloadAction<CoopAuthenticatePayload>) => {
      state.cooperative.token = action.payload.token;
      state.cooperative.user = action.payload.user;
      state.cooperative.isLogged = true;
    },

    authenticateCooperative: (
      state,
      action: PayloadAction<{ user: Partial<EbankingCooperative> }>
    ) => {
      state.cooperative.user = action.payload.user;
      state.cooperative.isLogged = true;
    },

    logoutCooperative: (state) => {
      localStorage.removeItem('coop-refreshToken');
      state.cooperative.token = null;
      state.cooperative.isLogged = false;
      state.cooperative.user = null;
    },
  },
});

export const {
  authenticate,
  logout,
  saveToken,
  login,
  saveCoopToken,
  switchCooperative,
  authenticateCooperative,
  logoutCooperative,
  setCurrentToken,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
