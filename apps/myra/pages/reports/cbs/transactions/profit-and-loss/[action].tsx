import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ProfitAndLossReport } from '@coop/cbs/reports';

const ProfitAndLossReportPage = () => <ProfitAndLossReport />;

export default ProfitAndLossReportPage;

ProfitAndLossReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
