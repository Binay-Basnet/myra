import { ReactElement } from 'react';
import { TransferDetailsHeader } from 'libs/cbs/transfer/feature-detail-page/src/component';

import { MainLayout, Scrollable } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { CashTransitTransferDetailPage } from '@coop/cbs/transfer/detail';

const CashTransferDetail = () => (
  <>
    <TransferDetailsHeader title="Cash in Transit Transfer" />
    <CashTransitTransferDetailPage />
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
