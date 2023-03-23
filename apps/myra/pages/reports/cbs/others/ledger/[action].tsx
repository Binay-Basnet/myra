import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LedgerReport } from '@coop/cbs/reports';

export const LedgerReportPage = () => <LedgerReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
