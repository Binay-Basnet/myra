import React, { useContext } from 'react';

import { LoanProduct } from '@coop/cbs/data-access';

export type LoanProductContextType = {
  product: Partial<LoanProduct> | null;
};

export const LoanProductContext = React.createContext<LoanProductContextType>({ product: null });

export const useLoanProductContext = () => useContext(LoanProductContext);
