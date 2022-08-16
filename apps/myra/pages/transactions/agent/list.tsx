import React, { ReactElement } from 'react';

// import { AgentList } from '@coop/cbs/transactions/agent';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsAgentList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
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
