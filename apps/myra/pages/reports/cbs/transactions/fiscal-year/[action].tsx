import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { FiscalYearReport } from '@coop/cbs/reports';

const FiscalYearReportPage = () => <FiscalYearReport />;

export default FiscalYearReportPage;

FiscalYearReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
