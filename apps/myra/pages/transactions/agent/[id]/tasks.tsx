import React, { ReactElement } from 'react';

import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionAgentTasks = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

TransactionAgentTasks.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionAgentTasks;
