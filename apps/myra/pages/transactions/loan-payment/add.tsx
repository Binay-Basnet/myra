import React, { ReactElement } from 'react';

import { AddLoanPayment } from '@coop/cbs/transactions/loan-payment';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAddLoanPayment = () => {
  return <AddLoanPayment />;
};

TransactionsAddLoanPayment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddLoanPayment;
