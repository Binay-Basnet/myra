import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BranchMinimal, RoleInfo, User, UserPreference } from '@coop/cbs/data-access';

import type { RootState } from '../store';

interface AuthenticatePayload {
  user: Partial<User>;
  availableBranches: BranchMinimal[];
  availableRoles: RoleInfo[];
  permissions: Record<string, string>;
  preference: UserPreference | null;

  accessToken: string;
  refreshToken: string;
}

// Define a type for the slice state
interface AuthState {
  user: Partial<User> | null;
  availableBranches: BranchMinimal[] | null;
  availableRoles: RoleInfo[] | null;
  permissions: Record<string, string> | null;
  preference: UserPreference | null;
  accessToken: string | null;
  refreshToken: string | null;

  isLogged: boolean | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  availableBranches: null,
  availableRoles: null,
  permissions: null,
  preference: null,
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
      state.availableBranches = action.payload.availableBranches;
      state.availableRoles = action.payload.availableRoles;
      state.preference = action.payload.preference;
      state.permissions = action.payload.permissions;
      state.user = action.payload.user;
      state.isLogged = true;
    },
    // login: (state, action: PayloadAction<AuthenticatePayload>) => {
    //   state.availableBranches = action.payload.availableBranches;
    //   state.availableRoles = action.payload.availableRoles;
    //   state.preference = action.payload.preference;
    //   state.permissions = action.payload.permissions;
    //   state.user = action.payload.user;
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    //
    //   localStorage.setItem('refreshToken', action.payload.refreshToken);
    //
    //   state.isLogged = true;
    // },
    setPreference: (state, action: PayloadAction<{ preference: UserPreference }>) => {
      state.preference = action.payload.preference;
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

export const { authenticate, logout, saveToken, setPreference } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
