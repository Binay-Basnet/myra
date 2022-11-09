import { ReactElement } from 'react';

import { LedgerReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

export const LedgerReportPage = () => <LedgerReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
