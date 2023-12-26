import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AgentTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';

const AgentTransactionDetailsPage = () => <AgentTransactionDetailPage />;

AgentTransactionDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AgentTransactionDetailsPage;
