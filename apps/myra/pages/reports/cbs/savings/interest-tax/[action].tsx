import { ReactElement } from 'react';

import { InterestTaxReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

export const SavingStatementReportPage = () => <InterestTaxReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
