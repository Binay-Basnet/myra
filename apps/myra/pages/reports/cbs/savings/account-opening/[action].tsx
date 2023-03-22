import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountOpenReport } from '@coop/cbs/reports';

export const AccountOpeningReportPage = () => <AccountOpenReport />;

export default AccountOpeningReportPage;

AccountOpeningReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
