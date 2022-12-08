import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { AccountCloseReport } from '@coop/cbs/reports';

export const AccountOpeningReportPage = () => <AccountCloseReport />;

export default AccountOpeningReportPage;

AccountOpeningReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
