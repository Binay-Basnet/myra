import React, { ReactElement } from 'react';

import { NewAccountTransfer } from '@coop/cbs/transactions/account-transfer';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAddAccountTransfer = () => {
  return <NewAccountTransfer />;
};

TransactionsAddAccountTransfer.getLayout = function getLayout(
  page: ReactElement
) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAccountTransfer;
