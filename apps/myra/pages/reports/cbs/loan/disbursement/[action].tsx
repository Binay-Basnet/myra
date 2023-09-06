import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanDisburesementReport } from '@coop/cbs/reports';

export const LoanDisburesementReportPage = () => <LoanDisburesementReport />;

export default LoanDisburesementReportPage;

LoanDisburesementReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
