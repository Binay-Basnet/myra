import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { PearlsReport } from '@coop/cbs/reports';

export const PearlsReportPage = () => <PearlsReport />;

export default PearlsReportPage;

PearlsReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
