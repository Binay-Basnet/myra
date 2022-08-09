import { ReactElement } from 'react';

import { CBSAccountList } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  return <CBSAccountList />;
};

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountListPage;
