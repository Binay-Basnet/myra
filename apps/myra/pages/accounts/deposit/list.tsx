import { ReactElement } from 'react';

import { DepositList } from '@coop/cbs/transactions/deposit';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const AccountsDepositList = () => <DepositList />;

AccountsDepositList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountsDepositList;
