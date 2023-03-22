import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddVaultTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddVaultTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default Transfer;
