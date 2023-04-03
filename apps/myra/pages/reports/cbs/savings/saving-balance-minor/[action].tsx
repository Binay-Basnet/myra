import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { SavingBalanceMinorReport } from '@coop/cbs/reports';

export const SavingBalanceReportPage = () => <SavingBalanceMinorReport />;

export default SavingBalanceReportPage;

SavingBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
