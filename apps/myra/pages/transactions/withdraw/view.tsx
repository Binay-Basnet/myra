import { ReactElement } from 'react';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { WithdrawDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const DepositDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Transactions List" />
    <WithdrawDetailPage />
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
