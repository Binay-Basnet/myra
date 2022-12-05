import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanAgingStatementsReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <LoanAgingStatementsReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
