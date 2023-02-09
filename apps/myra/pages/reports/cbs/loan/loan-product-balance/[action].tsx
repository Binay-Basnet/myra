import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanProductWiseBalanceReport } from '@coop/cbs/reports';

export const LoanProductBalanceReportPage = () => <LoanProductWiseBalanceReport />;

export default LoanProductBalanceReportPage;

LoanProductBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
