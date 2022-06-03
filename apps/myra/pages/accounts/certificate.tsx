import { ReactElement } from 'react';
import { AccountPagesLayout, ShareTable } from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

// TODO ( Update this page when design arrives )
const AccountCertificatePrint = () => {
  return <ShareTable />;
};

AccountCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountCertificatePrint;
