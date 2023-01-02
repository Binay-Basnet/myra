import { ReactElement } from 'react';

import { AccountTransferList } from '@coop/cbs/transactions/account-transfer';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@myra-ui';

const TransactionsAccountTransferList = () => <AccountTransferList />;

TransactionsAccountTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default TransactionsAccountTransferList;
