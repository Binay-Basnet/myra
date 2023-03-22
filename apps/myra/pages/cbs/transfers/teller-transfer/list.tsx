import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { TellerTransferList } from '@coop/cbs/transfer';

const Transfer = () => <TellerTransferList />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default Transfer;
