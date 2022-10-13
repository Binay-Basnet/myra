import { ReactElement } from 'react';

// import { AgentList } from '@coop/cbs/transactions/agent';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsAddAgent = () => (
  // <AgentList />
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

TransactionsAddAgent.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAgent;
