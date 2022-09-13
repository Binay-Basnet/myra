import React, { ReactElement } from 'react';

// import { AddLoanPayment } from '@coop/cbs/transactions/loan-payment';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsAddLoanPayment = () => (
    // <AddLoanPayment />
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );

TransactionsAddLoanPayment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddLoanPayment;
