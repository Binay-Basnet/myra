import { AccountLayout, AccountListTable } from '@saccos/myra/components';
import Router from 'next/router';
import { ReactElement } from 'react';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  return <AccountListTable />;
};

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout
      onClick={() => Router.push('/accounts/add-new-account')}
      headingText={'Accounts List'}
    >
      {page}
    </AccountLayout>
  );
};
export default AccountListPage;
