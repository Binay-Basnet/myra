import { ReactElement } from 'react';

// import { LoanPaymentList } from '@coop/cbs/transactions/loan-payment';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsLoanPaymentList = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

// <LoanPaymentList />;
TransactionsLoanPaymentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsLoanPaymentList;
