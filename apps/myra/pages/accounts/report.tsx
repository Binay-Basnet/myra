import { ReactElement } from 'react';
import { AccountPagesLayout, ShareTable } from '@coop/myra/components';
import { MainLayout } from '@coop/myra/ui';

// TODO ( Update this page when design arrives )
const AccountReportPage = () => {
  return <ShareTable />;
};

AccountReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountReportPage;
