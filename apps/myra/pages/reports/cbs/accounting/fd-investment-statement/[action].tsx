import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { FDInvestmentStatementReport } from '@coop/cbs/reports';

export const FDInvestmentStatementReportPage = () => <FDInvestmentStatementReport />;

export default FDInvestmentStatementReportPage;

FDInvestmentStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
