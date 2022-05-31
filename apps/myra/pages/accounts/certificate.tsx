import { AccountLayout, ShareTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

// TODO ( Update this page when design arrives )
const AccountCertificatePrint = () => {
  return <ShareTable />;
};

AccountCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout headingText={'Account Certificate'}>{page}</AccountLayout>
  );
};
export default AccountCertificatePrint;
