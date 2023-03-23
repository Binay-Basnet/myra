import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ExceptionLoanBalanceReport } from '@coop/cbs/reports';

export const LoanBalanceExceptionReportPage = () => <ExceptionLoanBalanceReport />;

export default LoanBalanceExceptionReportPage;

LoanBalanceExceptionReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
