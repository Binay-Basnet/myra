import { ReactElement } from 'react';

import { MBRegistrationReport } from '@coop/cbs/reports';
import { MainLayout, Scrollable } from '@myra-ui';

const MBankingRegistrationReportPage = () => <MBRegistrationReport />;

export default MBankingRegistrationReportPage;

MBankingRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
