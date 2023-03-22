import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanBalanceReport } from '@coop/cbs/reports';

export const LoanBalanceReportPage = () => <LoanBalanceReport />;

export default LoanBalanceReportPage;

LoanBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
