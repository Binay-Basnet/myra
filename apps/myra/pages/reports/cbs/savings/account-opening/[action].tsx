import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { AccountOpenReport } from '@coop/cbs/reports';

export const AccountOpeningReportPage = () => <AccountOpenReport />;

export default AccountOpeningReportPage;

AccountOpeningReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
