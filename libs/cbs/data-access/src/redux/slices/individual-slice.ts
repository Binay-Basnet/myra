import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type KYMSection = {
  section: string;
  subSection: string;
};

// Define a type for the slice state
interface IndividualState {
  isFormDirty: boolean;
  hasPressedNext: boolean;
  isFormLoading: boolean;
  kymCurrentSection: KYMSection | undefined;
  basic: {
    errors: Record<string, string[]>;
  };
}

// Define the initial state using that type
const initialState: () => IndividualState = () => ({
  hasPressedNext: false,
  isFormDirty: false,
  kymCurrentSection: undefined,
  isFormLoading: false,
  basic: {
    errors: {},
    incomplete: {},
  },
});

export const individuialSLice = createSlice({
  name: 'individual',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState(),
  reducers: {
    addIndividualError: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.basic.errors = action.payload;
    },

    setIndividualFormDirty: (state, action: PayloadAction<boolean>) => {
      state.isFormDirty = action.payload;
    },

    setIndividualHasPressedNext: (state, action: PayloadAction<boolean>) => {
      state.hasPressedNext = action.payload;
    },

    resetIndividual: () => initialState(),

    setFormLoading: (state, action: PayloadAction<boolean>) => {
      state.isFormLoading = action.payload;
    },
    setKYMIndSection: (state, action: PayloadAction<KYMSection>) => {
      state.kymCurrentSection = action.payload;
    },
  },
});

export const {
  setKYMIndSection,
  addIndividualError,
  setIndividualFormDirty,
  setIndividualHasPressedNext,
  resetIndividual,
} = individuialSLice.actions;

export default individuialSLice.reducer;
