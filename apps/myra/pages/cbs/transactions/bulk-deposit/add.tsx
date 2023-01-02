import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddBulkDeposit } from '@coop/cbs/transactions/deposit';

const TransactionsAddBulkDeposit = () => <AddBulkDeposit />;

TransactionsAddBulkDeposit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddBulkDeposit;
