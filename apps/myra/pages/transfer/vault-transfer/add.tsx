import { ReactElement } from 'react';

import { AddVaultTransfer } from '@coop/cbs/transfer';
import { MainLayout } from '@myra-ui';

const Transfer = () => <AddVaultTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
