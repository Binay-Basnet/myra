import React, { ReactElement } from 'react';

// import { LoanPaymentList } from '@coop/cbs/transactions/loan-payment';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayout } from '@coop/shared/ui';

const TransactionsLoanPaymentList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );

  // <LoanPaymentList />;
};

TransactionsLoanPaymentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsLoanPaymentList;
