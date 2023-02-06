import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanStatementReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <LoanStatementReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
