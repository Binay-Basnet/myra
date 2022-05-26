import { ReactElement } from 'react';

import { AccountLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  return <MemberTable />;
};

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout headingText={'Accounts List'}>{page}</AccountLayout>;
};
export default AccountListPage;
