import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

// Define a type for the slice state
interface LoanSettingsState {
  general?: {
    emi?: boolean | null;
    epi?: boolean | null;
    flat?: boolean | null;
    collateralList?: { name?: string | null; enabled?: string | null }[] | null;
  } | null;
}

// Define the initial state using that type
const initialState: LoanSettingsState = {
  general: null,
};

export const loanSettingSlice = createSlice({
  name: 'loanSettings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setEmi: (state, action: PayloadAction<boolean>) => {
      state.general = { ...state.general, emi: action.payload };
    },
    setEpi: (state, action: PayloadAction<boolean>) => {
      state.general = { ...state.general, epi: action.payload };
    },
    setFlat: (state, action: PayloadAction<boolean>) => {
      state.general = { ...state.general, flat: action.payload };
    },
  },
});

export const { setEmi, setEpi, setFlat } = loanSettingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoanSetting = (state: RootState) => state;

export default loanSettingSlice.reducer;
