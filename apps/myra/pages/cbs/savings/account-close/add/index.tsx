import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CbsAccountClose } from '@coop/cbs/accounts/account-form';

const AccountCloseAdd = () => <CbsAccountClose />;

AccountCloseAdd.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default AccountCloseAdd;
