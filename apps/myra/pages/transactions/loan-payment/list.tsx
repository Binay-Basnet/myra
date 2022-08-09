import React, { ReactElement } from 'react';

import { LoanPaymentList } from '@coop/cbs/transactions/loan-payment';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const TransactionsLoanPaymentList = () => {
  return <LoanPaymentList />;
};

TransactionsLoanPaymentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsLoanPaymentList;
