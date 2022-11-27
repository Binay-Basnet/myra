import { ReactElement } from 'react';

import { CbsAccountClose } from '@coop/cbs/accounts/account-form';
import { MainLayout } from '@myra-ui';

const AccountCloseAdd = () => <CbsAccountClose />;

AccountCloseAdd.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default AccountCloseAdd;
