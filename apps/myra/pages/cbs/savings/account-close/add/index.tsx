import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsAccountClose } from '@coop/cbs/accounts/account-form';

const AccountCloseAdd = () => <CbsAccountClose />;

AccountCloseAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default AccountCloseAdd;
