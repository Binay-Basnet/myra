import React, { ReactElement } from 'react';

import { AgentAssignedMembers } from '@coop/cbs/transactions/agent';
import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@myra-ui';

const TransactionAgentDetail = () => <AgentAssignedMembers />;

TransactionAgentDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionAgentDetail;
