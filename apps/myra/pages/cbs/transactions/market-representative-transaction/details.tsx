import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AgentTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const AgentTransactionDetailsPage = () => (
  <>
    <TransactionDetailPathBar title="Transaction List" />
    <AgentTransactionDetailPage />
  </>
);

AgentTransactionDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};

export default AgentTransactionDetailsPage;
