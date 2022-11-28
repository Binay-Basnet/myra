import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { TTRReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <TTRReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
