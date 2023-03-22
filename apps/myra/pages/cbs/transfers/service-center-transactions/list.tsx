import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { CashTransferList } from '@coop/cbs/transfer';

const ServiceTransfer = () => <CashTransferList />;

ServiceTransfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default ServiceTransfer;
