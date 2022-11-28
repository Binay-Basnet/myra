import { ReactElement } from 'react';

import { AccountOpenNew } from '@coop/cbs/accounts/account-form';
import { MainLayout } from '@myra-ui';

const AccountOpen = () => <AccountOpenNew />;

export default AccountOpen;

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
