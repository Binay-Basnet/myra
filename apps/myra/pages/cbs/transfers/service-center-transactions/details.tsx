import { ReactElement } from 'react';
import { TransferDetailsHeader } from 'libs/cbs/transfer/feature-detail-page/src/component';

import { MainLayout } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { InterServiceCenterPage } from '@coop/cbs/transfer/detail';

const CashTransferDetail = () => (
  <>
    <TransferDetailsHeader title="Service Center Cash Transfer" />
    <InterServiceCenterPage />
  </>
);

CashTransferDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default CashTransferDetail;
