import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { DepositList } from '@coop/cbs/transactions/deposit';
import { AccountPagesLayout } from '@coop/myra/components';

const AccountsDepositList = () => <DepositList />;

AccountsDepositList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountsDepositList;
