import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountCloseReport } from '@coop/cbs/reports';

export const AccountOpeningReportPage = () => <AccountCloseReport />;

export default AccountOpeningReportPage;

AccountOpeningReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
