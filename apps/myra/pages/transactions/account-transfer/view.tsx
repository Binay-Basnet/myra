import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountTransferDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const DepositDetailsPage = () => (
  <>
    <TransactionDetailPathBar title="Transaction List" />
    <AccountTransferDetailPage />
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
