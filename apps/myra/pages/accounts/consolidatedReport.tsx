import { ReactElement } from 'react';

import { AccountPagesLayout, ShareTable } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountConsolidatedPage = () => {
  return <ShareTable />;
};

AccountConsolidatedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountConsolidatedPage;
