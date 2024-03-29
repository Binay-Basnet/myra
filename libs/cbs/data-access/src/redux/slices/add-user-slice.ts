import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

enum UserGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
}

// enum Roles {
//   Agent = 'AGENT',
//   BranchManager = 'BRANCH_MANAGER',
//   HeadTeller = 'HEAD_TELLER',
//   Superadmin = 'SUPERADMIN',
//   Teller = 'TELLER',
// }

// Define a type for the slice state
interface AddUserState {
  userData: {
    name: string;
    gender: UserGender;
    dob:
      | { local?: string | undefined; en?: string | undefined; np?: string | undefined }
      | undefined;
    contactNo: string;
    email: string;
    role: { label: string; value: string }[];
    branch: { label: string; value: string }[];
  };
}

// Define the initial state using that type
const initialState: AddUserState = {
  userData: {
    name: '',
    gender: UserGender.Male,
    dob: undefined,
    contactNo: '',
    email: '',
    role: [],
    branch: [],
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
