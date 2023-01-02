import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AgentDetailOverview } from '@coop/cbs/transactions/agent';
import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';

const TransactionAgentDetailOverview = () => <AgentDetailOverview />;

TransactionAgentDetailOverview.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionAgentDetailOverview;
