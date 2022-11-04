import { ReactElement } from 'react';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { AgentTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const AgentTransactionDetailsPage = () => (
  <>
    <LoanDetailsHeader title="Transactions List" />
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
