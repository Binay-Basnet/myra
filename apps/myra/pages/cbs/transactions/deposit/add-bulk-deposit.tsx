import React, { ReactElement } from 'react';

import { AddBulkDeposit } from '@coop/cbs/transactions/deposit';
import { MainLayout } from '@myra-ui';

const TransactionsAddBulkDeposit = () => <AddBulkDeposit />;

TransactionsAddBulkDeposit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddBulkDeposit;
