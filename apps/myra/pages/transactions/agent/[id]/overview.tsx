import React, { ReactElement } from 'react';

import { AgentDetailOverview } from '@coop/cbs/transactions/agent';
import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const TransactionAgentDetailOverview = () => <AgentDetailOverview />;

TransactionAgentDetailOverview.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionAgentDetailOverview;
