import { ReactElement } from 'react';

import { UsersReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

export const LedgerReportPage = () => <UsersReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
