import React from 'react';

import { CbsShareReturnPayment } from '@coop/cbs/share-return';
import { MainLayout } from '@coop/shared/ui';

const Payment = () => {
  return <CbsShareReturnPayment />;
};

Payment.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Payment;
