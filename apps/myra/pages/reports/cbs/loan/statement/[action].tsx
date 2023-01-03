import { ReactElement } from 'react';

import { LoanStatementReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

export const SavingStatementReportPage = () => <LoanStatementReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
