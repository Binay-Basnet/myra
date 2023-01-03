import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { UsersReport } from '@coop/cbs/reports';

export const LedgerReportPage = () => <UsersReport />;

export default LedgerReportPage;

LedgerReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
