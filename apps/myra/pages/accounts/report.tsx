import { ReactElement } from 'react';

import { AccountLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const AccountReportPage = () => {
  return <MemberTable />;
};

AccountReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout headingText={'Account Report'}>{page}</AccountLayout>;
};
export default AccountReportPage;
