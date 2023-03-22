import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ProfitAndLossReport } from '@coop/cbs/reports';

const ProfitAndLossReportPage = () => <ProfitAndLossReport />;

export default ProfitAndLossReportPage;

ProfitAndLossReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
