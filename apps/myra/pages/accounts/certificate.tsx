import { ReactElement } from 'react';

import { AccountLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const AccountCertificatePrint = () => {
  return <MemberTable />;
};

AccountCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountLayout headingText={'Account Certificate'}>{page}</AccountLayout>
  );
};
export default AccountCertificatePrint;
