import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface BranchReadinessErrors {
  branchReadinessErrors: string[];
}

// Define the initial state using that type
const initialState: BranchReadinessErrors = {
  branchReadinessErrors: [],
};

export const dayEndSlice = createSlice({
  name: 'branchReadiness',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBranchReadinessErrors: (state, action) => {
      state.branchReadinessErrors = action.payload.errors;
    },
    clearBranchReadinessErrors: (state) => {
      state.branchReadinessErrors = initialState.branchReadinessErrors;
    },
  },
});

export const { setBranchReadinessErrors, clearBranchReadinessErrors } = dayEndSlice.actions;

export default dayEndSlice.reducer;
