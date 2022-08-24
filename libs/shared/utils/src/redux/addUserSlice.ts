import { createSlice } from '@reduxjs/toolkit';

import { Roles, UserGender } from '@coop/cbs/data-access';

import type { RootState } from './store';

// Define a type for the slice state
interface AddUserState {
  userData: {
    name: string;
    gender: UserGender;
    dob: string;
    contactNo: string;
    email: string;
    role: Roles;
    branch: string;
  };
}

// Define the initial state using that type
const initialState: AddUserState = {
  userData: {
    name: '',
    gender: UserGender.Male,
    dob: '',
    contactNo: '',
    email: '',
    role: Roles.Agent,
    branch: '',
  },
};

export const addUserSlice = createSlice({
  name: 'addUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAddUserData: (state, action) => {
      state.userData = action.payload.userData;
    },
    clearAddUserData: (state) => {
      state.userData = initialState.userData;
    },
  },
});

export const { setAddUserData } = addUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAddUser = (state: RootState) => state;

export default addUserSlice.reducer;
