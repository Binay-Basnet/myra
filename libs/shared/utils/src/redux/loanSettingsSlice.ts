import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Frequency, LoanInsurancePaymentType } from '@coop/cbs/data-access';

import type { RootState } from './store';

// Define a type for the slice state
interface LoanSettingsState {
  general?: {
    emi?: boolean | null;
    epi?: boolean | null;
    flat?: boolean | null;
    collateralList?: { name?: string | null; enabled?: string | null }[] | null;
  } | null;
  insuranceScheme?:
    | {
        id?: string | null;
        schemeName?: string | null;
        insuranceCompany?: string | null;
        paymentFrequency?: Frequency | null;
        paymentType?: LoanInsurancePaymentType | null;
        minAmount?: string | null;
        maxAmount?: string | null;
        minPercent?: number | null;
        maxPercent?: number | null;
        insurancePremiumPercent?: number | null;
      }[]
    | null;
  productType?: {
    productTypes: {
      id?: string | null;
      productType?: string | null;
      description?: string | null;
    };

    productSubTypes: {
      id?: string | null;
      productSubType?: string | null;
      productTypeID?: string | null;
    };

    natureOfProduct: {
      id?: string | null;
      natureOfProduct?: string | null;
      description?: string | null;
    };
  };
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
    setCollateralList: (
      state,
      action: PayloadAction<{ name?: string | null; enabled?: string | null }[]>
    ) => {
      state.general = {
        ...state.general,
        collateralList: action.payload,
      };
    },
  },
});

export const { setEmi, setEpi, setFlat } = loanSettingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoanSetting = (state: RootState) => state;

export default loanSettingSlice.reducer;
