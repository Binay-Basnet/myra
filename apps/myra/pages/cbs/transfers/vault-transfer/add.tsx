import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddVaultTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddVaultTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
