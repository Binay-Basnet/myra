import { ReactElement } from 'react';

import { CBSAccountList } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@myra-ui';

const AccountListPage = () => <CBSAccountList />;

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountListPage;
