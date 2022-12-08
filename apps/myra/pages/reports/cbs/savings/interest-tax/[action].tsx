import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { InterestTaxReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <InterestTaxReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
