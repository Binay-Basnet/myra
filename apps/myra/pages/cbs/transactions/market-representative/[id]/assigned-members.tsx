import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AgentAssignedMembers } from '@coop/cbs/transactions/agent';
import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';

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
