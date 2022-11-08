import { ReactElement } from 'react';

import { MemberClassificationReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

export const SavingStatementReportPage = () => <MemberClassificationReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
