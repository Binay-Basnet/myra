import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddCashTransfer } from '@coop/cbs/transfer';

const ServiceCenterTransfer = () => <AddCashTransfer />;

ServiceCenterTransfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default ServiceCenterTransfer;
