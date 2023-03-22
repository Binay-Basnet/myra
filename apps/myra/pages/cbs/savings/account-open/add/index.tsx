import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountOpenNew } from '@coop/cbs/accounts/account-form';

const AccountOpen = () => <AccountOpenNew />;

export default AccountOpen;

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
