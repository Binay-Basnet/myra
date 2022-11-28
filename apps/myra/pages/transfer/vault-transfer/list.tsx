import { ReactElement } from 'react';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { VaultTransferList } from '@coop/cbs/transfer';
import { MainLayout } from '@myra-ui';

const Transfer = () => <VaultTransferList />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default Transfer;
