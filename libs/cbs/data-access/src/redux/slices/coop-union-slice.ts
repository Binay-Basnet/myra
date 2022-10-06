import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CoopUnionState {
  isFormDirty: boolean;
  hasPressedNext: boolean;
  institutionInformation: {
    errors: Record<string, string[]>;
  };
  bod: {
    director: {
      directorId?: string;
      errors?: Record<string, string[]>;
    }[];
  };
  accountOperator: {
    operator: {
      operatorId?: string;
      errors?: Record<string, string[]>;
    }[];
  };
  centralRepresentative: {
    errors: Record<string, string[]>;
  };
}

// Define the initial state using that type
const initialState: () => CoopUnionState = () => ({
  hasPressedNext: false,
  isFormDirty: false,
  institutionInformation: {
    errors: {},
    incomplete: {},
  },
  bod: {
    director: [{ errors: {}, incomplete: {} }],
  },
  accountOperator: {
    operator: [{ errors: {}, incomplete: {} }],
  },
  centralRepresentative: {
    errors: {},
    incomplete: {},
  },
});

export const coopUnionSLice = createSlice({
  name: 'coop-union',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState(),
  reducers: {
    addError: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.institutionInformation.errors = action.payload;
    },

    setFormDirty: (state, action: PayloadAction<boolean>) => {
      state.isFormDirty = action.payload;
    },

    setHasPressedNext: (state, action: PayloadAction<boolean>) => {
      state.hasPressedNext = action.payload;
    },

    addBodError: (
      state,
      action: PayloadAction<
        {
          directorId: string;
          errors?: Record<string, string[]>;
          incomplete?: Record<string, string[]>;
        }[]
      >
    ) => {
      state.bod.director = action.payload;
    },

    addAccountError: (
      state,
      action: PayloadAction<
        {
          operatorId: string;
          errors?: Record<string, string[]>;
          incomplete?: Record<string, string[]>;
        }[]
      >
    ) => {
      state.accountOperator.operator = action.payload;
    },

    addCentralRepError: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.centralRepresentative.errors = action.payload;
    },

    reset: () => initialState(),
  },
});

export const {
  addError,
  setFormDirty,
  addBodError,
  addAccountError,
  addCentralRepError,
  setHasPressedNext,
  reset,
} = coopUnionSLice.actions;

export default coopUnionSLice.reducer;
