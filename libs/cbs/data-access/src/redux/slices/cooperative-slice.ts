import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CooperativeSlice {
  isFormDirty: boolean;
  hasPressedNext: boolean;
  basic: {
    errors: Record<string, string[]>;
  };

  sisterCoop: {
    sisterId?: string;
    errors?: Record<string, string[]>;
  }[];

  accountOperator: {
    operator: {
      operatorId?: string;
      errors?: Record<string, string[]>;
    }[];
  };
  directorDetails: {
    director: {
      directorId?: string;
      errors?: Record<string, string[]>;
    }[];
  };
  totalEquity: number;
  totalAssets: number;
}

// Define the initial state using that type
const initialState: () => CooperativeSlice = () => ({
  hasPressedNext: false,
  isFormDirty: false,
  totalEquity: 0,
  totalAssets: 0,
  basic: {
    errors: {},
    incomplete: {},
  },
  sisterCoop: [{ errors: {} }],
  accountOperator: {
    operator: [{ errors: {} }],
  },
  directorDetails: {
    director: [{ errors: {} }],
  },
});

export const cooperativeSlice = createSlice({
  name: 'cooperative',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState(),
  reducers: {
    addCooperativeError: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.basic.errors = action.payload;
    },

    setCooperativeFormDirty: (state, action: PayloadAction<boolean>) => {
      state.isFormDirty = action.payload;
    },

    setCooperativeHasPressedNext: (state, action: PayloadAction<boolean>) => {
      state.hasPressedNext = action.payload;
    },

    setCooperativeTotalEquity: (state, action: PayloadAction<number>) => {
      state.totalEquity = action.payload;
    },

    setCooperativeTotalAssets: (state, action: PayloadAction<number>) => {
      state.totalAssets = action.payload;
    },

    addSisterCoopError: (
      state,
      action: PayloadAction<
        {
          sisterId: string;
          errors?: Record<string, string[]>;
        }[]
      >
    ) => {
      state.sisterCoop = action.payload;
    },

    addCooperativeAccountError: (
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
    addCooperativeDirectorError: (
      state,
      action: PayloadAction<
        {
          directorId: string;
          errors?: Record<string, string[]>;
        }[]
      >
    ) => {
      state.directorDetails.director = action.payload;
    },

    resetCooperative: () => initialState(),
  },
});

export const {
  addSisterCoopError,
  addCooperativeAccountError,
  addCooperativeDirectorError,
  addCooperativeError,
  setCooperativeFormDirty,
  setCooperativeHasPressedNext,
  resetCooperative,
  setCooperativeTotalAssets,
  setCooperativeTotalEquity,
} = cooperativeSlice.actions;

export default cooperativeSlice.reducer;
