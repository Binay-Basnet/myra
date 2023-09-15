import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LedgerBalanceReport } from '@coop/cbs/reports';

export const LedgerReportPage = () => <LedgerBalanceReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
