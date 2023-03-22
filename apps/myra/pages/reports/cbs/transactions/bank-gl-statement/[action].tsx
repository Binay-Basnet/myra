import { ReactElement } from 'react';
import { MainLayout, Scrollable } from '@myra-ui';

import { BankGLStatementReport } from '@coop/cbs/reports';

const ReportPage = () => <BankGLStatementReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
