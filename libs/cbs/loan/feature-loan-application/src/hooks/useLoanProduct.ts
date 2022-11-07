import React, { useContext, useMemo } from 'react';

import { LoanProduct, useGetLoanProductDetailsDataQuery } from '@coop/cbs/data-access';

export type LoanProductContextType = {
  product: Partial<LoanProduct> | null;
};

export const LoanProductContext = React.createContext<LoanProductContextType>({ product: null });

export const useLoanProductContext = () => useContext(LoanProductContext);

interface IUseLoanProductDetailsProps {
  productId: string;
}
export const useLoanProductDetails = ({ productId }: IUseLoanProductDetailsProps) => {
  const { data: loanProductDetails } = useGetLoanProductDetailsDataQuery(
    { id: String(productId) },
    {
      enabled: !!productId,
    }
  );
  const loanProduct = useMemo(
    () => ({
      product: loanProductDetails?.settings?.general?.loanProducts?.formState?.data as LoanProduct,
    }),
    [loanProductDetails?.settings?.general?.loanProducts?.formState?.data]
  );

  return { loanProduct };
};
