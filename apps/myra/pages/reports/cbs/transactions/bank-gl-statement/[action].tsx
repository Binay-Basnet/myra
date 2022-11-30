import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { BankGLStatementReport } from '@coop/cbs/reports';

const ReportPage = () => <BankGLStatementReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
