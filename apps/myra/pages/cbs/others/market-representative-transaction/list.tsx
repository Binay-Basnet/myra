import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { AgentTransactionList } from '@coop/cbs/transactions/agent-transaction';

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
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
export default TransactionsAgentTransactionList;
