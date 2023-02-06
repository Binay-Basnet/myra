import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AllTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const DepositDetailsPage = () => (
  <>
    <TransactionDetailPathBar
      title="Transaction List"
      closeLink="/cbs/transactions/all-transactions/list"
    />
    <AllTransactionDetailPage />
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
