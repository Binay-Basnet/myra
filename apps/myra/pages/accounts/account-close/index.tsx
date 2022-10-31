import { ReactElement } from 'react';

import { CBSAccountCloseList } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const AccountClose = () => <CBSAccountCloseList />;

AccountClose.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountClose;
