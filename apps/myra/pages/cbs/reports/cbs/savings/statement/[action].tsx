import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { SavingStatementReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <SavingStatementReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
