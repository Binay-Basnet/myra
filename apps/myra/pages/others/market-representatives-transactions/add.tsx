import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddAgentTransaction } from '@coop/cbs/transactions/agent-transaction';

const TransactionsAddAgentTransaction = () => <AddAgentTransaction />;

TransactionsAddAgentTransaction.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAgentTransaction;
