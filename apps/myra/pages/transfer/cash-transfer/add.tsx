import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddCashTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddCashTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
