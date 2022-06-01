import { ReactElement } from 'react';
import { AccountLayout, ShareTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const AccountReportPage = () => {
  return <ShareTable />;
};

AccountReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout headingText={'Account Report'}>{page}</AccountLayout>;
};
export default AccountReportPage;
