import { ReactElement } from 'react';

import { InterestPostingReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

export const SavingStatementReportPage = () => <InterestPostingReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};