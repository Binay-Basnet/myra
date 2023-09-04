import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountLockStatusReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <AccountLockStatusReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
