import { ReactElement } from 'react';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { LoanRepaymentDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const LoanRepaymentDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Transactions List" />
    <LoanRepaymentDetailPage />
  </>
);

LoanRepaymentDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};

export default LoanRepaymentDetailsPage;
