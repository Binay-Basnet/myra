import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui/templates';

import { DosariLoanReport } from '@coop/cbs/reports';

const DosariLoanReportPage = () => <DosariLoanReport />;
export default DosariLoanReportPage;

DosariLoanReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
