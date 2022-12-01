import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { CBSAccountCloseList } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';

const AccountClose = () => <CBSAccountCloseList />;

AccountClose.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountClose;
