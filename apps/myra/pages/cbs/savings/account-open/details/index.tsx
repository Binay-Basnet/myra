import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountDetails } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';

const AccountListPage = () => <AccountDetails />;

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountListPage;
