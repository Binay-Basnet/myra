import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BankGLBalanceReport } from '@coop/cbs/reports';

const ReportPage = () => <BankGLBalanceReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
