import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface InstitutionSlice {
  isFormDirty: boolean;
  hasPressedNext: boolean;
  basic: {
    errors: Record<string, string[]>;
  };

  sister: {
    sisterId?: string;
    errors?: Record<string, string[]>;
  }[];

  accountOperator: {
    operator: {
      operatorId?: string;
      errors?: Record<string, string[]>;
    }[];
  };
}

// Define the initial state using that type
const initialState: () => InstitutionSlice = () => ({
  hasPressedNext: false,
  isFormDirty: false,
  basic: {
    errors: {},
    incomplete: {},
  },
  sister: [{ errors: {} }],
  accountOperator: {
    operator: [{ errors: {}, incomplete: {} }],
  },
});

export const institutionSlice = createSlice({
  name: 'institution',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState(),
  reducers: {
    addInstitutionError: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.basic.errors = action.payload;
    },

    setInstitutionFormDirty: (state, action: PayloadAction<boolean>) => {
      state.isFormDirty = action.payload;
    },

    setInstitutionHasPressedNext: (state, action: PayloadAction<boolean>) => {
      state.hasPressedNext = action.payload;
    },

    addSisterError: (
      state,
      action: PayloadAction<
        {
          sisterId: string;
          errors?: Record<string, string[]>;
        }[]
      >
    ) => {
      state.sister = action.payload;
    },

    addInstitutionAccountError: (
      state,
      action: PayloadAction<
        {
          operatorId: string;
          errors?: Record<string, string[]>;
        }[]
      >
    ) => {
      state.accountOperator.operator = action.payload;
    },

    resetInstitution: () => initialState(),
  },
});

export const {
  addSisterError,
  addInstitutionError,
  addInstitutionAccountError,
  setInstitutionFormDirty,
  setInstitutionHasPressedNext,
  resetInstitution,
} = institutionSlice.actions;

export default institutionSlice.reducer;
