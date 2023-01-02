import { ReactElement } from 'react';

import { MBExpiryReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

const MBankingExpiryReport = () => <MBExpiryReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
