import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanWriteOffReport } from '@coop/cbs/reports';

export const LoanWriteOffReportPage = () => <LoanWriteOffReport />;

export default LoanWriteOffReportPage;

LoanWriteOffReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
