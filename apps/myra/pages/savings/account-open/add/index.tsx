import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountOpenNew } from '@coop/cbs/accounts/account-form';

const AccountOpen = () => <AccountOpenNew />;

export default AccountOpen;

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
