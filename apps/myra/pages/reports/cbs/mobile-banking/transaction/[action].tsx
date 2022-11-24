import { ReactElement } from 'react';

import { MBTransactionsReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

const MBankingRegistrationReportPage = () => <MBTransactionsReport />;

export default MBankingRegistrationReportPage;

MBankingRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
