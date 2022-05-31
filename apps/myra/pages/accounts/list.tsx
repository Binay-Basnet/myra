import { ReactElement } from 'react';
import { AccountLayout, AccountListTable } from '@saccos/myra/components';
import Router from 'next/router';

import { useMembersQuery } from '../../generated/graphql';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  const { data, isLoading } = useMembersQuery();

  return <AccountListTable data={data} isLoading={isLoading} />;
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
