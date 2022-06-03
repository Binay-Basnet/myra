import { ReactElement } from 'react';
import { AccountPagesLayout, ShareTable } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  return <ShareTable />;
};

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountListPage;
