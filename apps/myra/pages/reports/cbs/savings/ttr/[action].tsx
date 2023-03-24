import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TTRReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <TTRReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
