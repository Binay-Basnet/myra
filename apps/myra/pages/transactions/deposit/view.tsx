import { ReactElement } from 'react';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { DepositDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@myra-ui';

const DepositDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Transaction List" />
    <DepositDetailPage />
  </>
);

DepositDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};

export default DepositDetailsPage;
