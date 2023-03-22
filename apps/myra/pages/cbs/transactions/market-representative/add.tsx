import { ReactElement } from 'react';

// import { AgentList } from '@coop/cbs/transactions/agent';
import { Box, MainLayout, Scrollable, WIPState } from '@myra-ui';

const TransactionsAddAgent = () => (
  // <AgentList />
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

TransactionsAddAgent.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddAgent;
