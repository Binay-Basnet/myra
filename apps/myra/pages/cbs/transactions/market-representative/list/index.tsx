import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AgentList } from '@coop/cbs/transactions/agent';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionsAgentList = () => <AgentList />;

TransactionsAgentList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsAgentList;
