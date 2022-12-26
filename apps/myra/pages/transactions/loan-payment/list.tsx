import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CBSLoanRepaymentList } from '@coop/cbs/loan/repayment';
// import { LoanPaymentList } from '@coop/cbs/transactions/loan-payment';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionsLoanPaymentList = () => <CBSLoanRepaymentList />;

// <LoanPaymentList />;
TransactionsLoanPaymentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsLoanPaymentList;
