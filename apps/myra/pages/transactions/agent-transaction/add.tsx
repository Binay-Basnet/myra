import React, { ReactElement } from 'react';

// import { AddAgentTransaction } from '@coop/cbs/transactions/agent-transaction';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsAddAgentTransaction = () => (
    // <AddAgentTransaction />
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );

TransactionsAddAgentTransaction.getLayout = function getLayout(
  page: ReactElement
) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAgentTransaction;
