import { ReactElement } from 'react';

import { AddBulkDeposit } from '@coop/cbs/transactions/deposit';
import { MainLayout, Scrollable } from '@myra-ui';

const TransactionsAddBulkDeposit = () => <AddBulkDeposit />;

TransactionsAddBulkDeposit.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddBulkDeposit;
