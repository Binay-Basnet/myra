import { ReactElement } from 'react';

import { KYMStatusReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

const MBankingExpiryReport = () => <KYMStatusReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
