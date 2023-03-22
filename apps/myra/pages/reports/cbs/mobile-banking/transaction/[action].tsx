import { ReactElement } from 'react';

import { MBTransactionsReport } from '@coop/cbs/reports';
import { MainLayout, Scrollable } from '@myra-ui';

const MBankingRegistrationReportPage = () => <MBTransactionsReport />;

export default MBankingRegistrationReportPage;

MBankingRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
