import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanProductWiseBalanceReport } from '@coop/cbs/reports';

export const LoanProductBalanceReportPage = () => <LoanProductWiseBalanceReport />;

export default LoanProductBalanceReportPage;

LoanProductBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
