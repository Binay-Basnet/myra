import React, { ReactElement } from 'react';

import { AgentList } from '@coop/cbs/transactions/agent';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAgentList = () => {
  return <AgentList />;
};

TransactionsAgentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsAgentList;
