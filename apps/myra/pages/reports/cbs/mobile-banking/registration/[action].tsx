import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MBRegistrationReport } from '@coop/cbs/reports';

const MBankingRegistrationReportPage = () => <MBRegistrationReport />;

export default MBankingRegistrationReportPage;

MBankingRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
