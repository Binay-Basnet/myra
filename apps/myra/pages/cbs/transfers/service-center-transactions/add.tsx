import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddCashTransfer } from '@coop/cbs/transfer';

const ServiceCenterTransfer = () => <AddCashTransfer />;

ServiceCenterTransfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ServiceCenterTransfer;
