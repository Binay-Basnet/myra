import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountTransferList } from '@coop/cbs/transactions/account-transfer';
import { AccountPagesLayout } from '@coop/myra/components';

const TransactionsAccountTransferList = () => <AccountTransferList />;

TransactionsAccountTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default TransactionsAccountTransferList;
