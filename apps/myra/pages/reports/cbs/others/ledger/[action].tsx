import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LedgerReport } from '@coop/cbs/reports';

export const LedgerReportPage = () => <LedgerReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
