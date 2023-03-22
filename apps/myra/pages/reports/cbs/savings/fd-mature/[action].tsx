import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { FixedDepositsReport } from '@coop/cbs/reports';

export const FixedDepositMatureReport = () => <FixedDepositsReport />;

export default FixedDepositMatureReport;

FixedDepositMatureReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
