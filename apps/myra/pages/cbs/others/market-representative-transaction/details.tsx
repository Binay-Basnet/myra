import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { AgentTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';

const AgentTransactionDetailsPage = () => (
  <>
    <TransactionDetailPathBar title="Transaction List" />
    <AgentTransactionDetailPage />
  </>
);

AgentTransactionDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};

export default AgentTransactionDetailsPage;
