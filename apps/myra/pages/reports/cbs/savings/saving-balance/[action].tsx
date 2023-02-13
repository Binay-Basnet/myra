import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { SavingBalanceReport } from '@coop/cbs/reports';

export const SavingBalanceReportPage = () => <SavingBalanceReport />;

export default SavingBalanceReportPage;

SavingBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
