import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddAgentTransaction } from '@coop/cbs/transactions/agent-transaction';

const TransactionsAddAgentTransaction = () => <AddAgentTransaction />;

TransactionsAddAgentTransaction.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddAgentTransaction;
