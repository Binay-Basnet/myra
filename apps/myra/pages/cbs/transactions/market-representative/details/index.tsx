import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AgentDetails } from '@coop/cbs/transactions/agent';
import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';

const TransactionAgentDocuments = () => <AgentDetails />;
TransactionAgentDocuments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionAgentDocuments;
