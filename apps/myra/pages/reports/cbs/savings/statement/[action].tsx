import { ReactElement } from 'react';

import { SavingStatementReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

export const SavingStatementReportPage = () => <SavingStatementReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
