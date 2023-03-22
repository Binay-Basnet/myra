import { ReactElement } from 'react';

import { MBExpiryReport } from '@coop/cbs/reports';
import { MainLayout, Scrollable } from '@myra-ui';

const MBankingExpiryReport = () => <MBExpiryReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
