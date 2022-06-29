import React, { ReactElement } from 'react';
import { MainLayout } from '@coop/shared/ui';
import { CbsAccountOpen } from '@coop/cbs/accounts/account-form';

const AccountOpen = () => {
  return <CbsAccountOpen />;
};

export default AccountOpen;

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
