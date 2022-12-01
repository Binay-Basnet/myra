import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { LoanRepaymentDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const LoanRepaymentDetailsPage = () => (
  <>
    <TransactionDetailPathBar title="Transaction List" />
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
