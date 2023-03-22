import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanCallSheetReport } from '@coop/cbs/reports';

export const LoanCallSheetReportPage = () => <LoanCallSheetReport />;

export default LoanCallSheetReportPage;

LoanCallSheetReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
