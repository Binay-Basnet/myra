import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { SavingProductBalanceReport } from '@coop/cbs/reports';

export const SavingProductBalanceReportPage = () => <SavingProductBalanceReport />;

export default SavingProductBalanceReportPage;

SavingProductBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
