import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { SavingBalanceReport } from '@coop/cbs/reports';

export const LoanBalanceReportPage = () => <SavingBalanceReport />;

export default LoanBalanceReportPage;

LoanBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
