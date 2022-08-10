import React, { ReactElement } from 'react';

import { AddDeposit } from '@coop/cbs/transactions/deposit';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAddDeposit = () => {
  return <AddDeposit />;
};

TransactionsAddDeposit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddDeposit;
