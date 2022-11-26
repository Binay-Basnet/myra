import { ReactElement } from 'react';

import { UsersReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

export const LedgerReportPage = () => <UsersReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
