import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CopomisFinancialReport } from '@coop/cbs/reports';

export const COPOMISFinancialReportPage = () => <CopomisFinancialReport />;

export default COPOMISFinancialReportPage;

COPOMISFinancialReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
