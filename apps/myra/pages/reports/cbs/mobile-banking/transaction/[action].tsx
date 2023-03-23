import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MBTransactionsReport } from '@coop/cbs/reports';

const MBankingRegistrationReportPage = () => <MBTransactionsReport />;

export default MBankingRegistrationReportPage;

MBankingRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
