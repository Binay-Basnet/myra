import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { FDInvestmentReport } from '@coop/cbs/reports';

export const FDInvestmentReportPage = () => <FDInvestmentReport />;

export default FDInvestmentReportPage;

FDInvestmentReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
