import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { FixedDepositsReport } from '@coop/cbs/reports';

export const FixedDepositMatureReport = () => <FixedDepositsReport />;

export default FixedDepositMatureReport;

FixedDepositMatureReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
