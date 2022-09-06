import React, { ReactElement } from 'react';

import { AccountOpenNew } from '@coop/cbs/accounts/account-form';
import { MainLayout } from '@coop/shared/ui';

const AccountOpen = () => {
  return <AccountOpenNew />;
};

export default AccountOpen;

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
