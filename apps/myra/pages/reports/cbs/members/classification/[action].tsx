import { ReactElement } from 'react';

import { MemberClassificationReport } from '@coop/cbs/reports';
import { MainLayout, Scrollable } from '@myra-ui';

export const SavingStatementReportPage = () => <MemberClassificationReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
