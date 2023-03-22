import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountingFeatureJournalVouchersList } from '@coop/accounting/accounting';
// import { LoanPaymentList } from '@coop/cbs/transactions/loan-payment';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionsLoanPaymentList = () => <AccountingFeatureJournalVouchersList />;

// <LoanPaymentList />;
TransactionsLoanPaymentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsLoanPaymentList;
