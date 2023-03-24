import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { DayBookReport } from '@coop/cbs/reports';

const DayBookReportPage = () => <DayBookReport />;

export default DayBookReportPage;

DayBookReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
