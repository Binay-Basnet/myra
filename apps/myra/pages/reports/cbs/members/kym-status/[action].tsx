import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { KYMStatusReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <KYMStatusReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
