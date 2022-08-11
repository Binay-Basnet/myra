import React, { ReactElement } from 'react';

import { AddAgentTransaction } from '@coop/cbs/transactions/agent-transaction';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAddAgentTransaction = () => {
  return <AddAgentTransaction />;
};

TransactionsAddAgentTransaction.getLayout = function getLayout(
  page: ReactElement
) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAgentTransaction;