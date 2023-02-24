import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ExceptionLoanBalanceReport } from '@coop/cbs/reports';

export const LoanBalanceExceptionReportPage = () => <ExceptionLoanBalanceReport />;

export default LoanBalanceExceptionReportPage;

LoanBalanceExceptionReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
