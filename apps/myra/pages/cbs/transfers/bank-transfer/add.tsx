import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddBankTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddBankTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
