import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { InterestPostingReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <InterestPostingReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
