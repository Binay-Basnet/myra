import React, { ReactElement } from 'react';

import { AgentList } from '@coop/cbs/transactions/agent';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAddAgent = () => {
  return <AgentList />;
};

TransactionsAddAgent.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAgent;
