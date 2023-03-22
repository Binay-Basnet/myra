import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { PearlsReport } from '@coop/cbs/reports';

export const PearlsReportPage = () => <PearlsReport />;

export default PearlsReportPage;

PearlsReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
