import { ReactElement } from 'react';
import { AccountLayout, ShareTable } from '@saccos/myra/components';
import Router from 'next/router';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  return <ShareTable />;
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
