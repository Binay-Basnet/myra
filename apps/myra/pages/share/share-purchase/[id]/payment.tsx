import React from 'react';

import { CbsSharePurchasePayment } from '@coop/cbs/share';
import { MainLayout } from '@coop/shared/ui';

const Payment = () => {
  return <CbsSharePurchasePayment />;
};

Payment.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Payment;
