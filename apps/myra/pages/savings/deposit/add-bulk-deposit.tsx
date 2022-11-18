import { ReactElement } from 'react';

import { AddBulkDeposit } from '@coop/cbs/transactions/deposit';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAddBulkDeposit = () => <AddBulkDeposit />;

TransactionsAddBulkDeposit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddBulkDeposit;
