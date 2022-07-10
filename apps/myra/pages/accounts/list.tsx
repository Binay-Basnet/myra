import { ReactElement } from 'react';

import { MemberListPage } from '@coop/cbs/members/list';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountListPage = () => {
  return <MemberListPage />;
};

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountListPage;
