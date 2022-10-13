import { ReactElement } from 'react';

import { AgentTransactionList } from '@coop/cbs/transactions/agent-transaction';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAgentTransactionList = () => (
  // return (
  //   <Box display="flex" justifyContent="center" alignItems="center">
  //     <WIPState />
  //   </Box>
  // );

  <AgentTransactionList />
);
TransactionsAgentTransactionList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsAgentTransactionList;
