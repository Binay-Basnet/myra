import React, { ReactElement } from 'react';

// import { AgentList } from '@coop/cbs/transactions/agent';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayout } from '@coop/shared/ui';

const TransactionsAgentList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );

  // <AgentList />;
};

TransactionsAgentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsAgentList;
