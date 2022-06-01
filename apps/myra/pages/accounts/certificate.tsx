import { ReactElement } from 'react';
import { AccountLayout, ShareTable } from '@saccos/myra/components';

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
