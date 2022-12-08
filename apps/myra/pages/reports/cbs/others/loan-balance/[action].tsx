import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanBalanceReport } from '@coop/cbs/reports';

export const LoanBalanceReportPage = () => <LoanBalanceReport />;

export default LoanBalanceReportPage;

LoanBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
