import { ReactElement } from 'react';

import { MBRegistrationReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

const MBankingRegistrationReportPage = () => <MBRegistrationReport />;

export default MBankingRegistrationReportPage;

MBankingRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
