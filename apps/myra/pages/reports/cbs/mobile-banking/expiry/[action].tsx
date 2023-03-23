import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MBExpiryReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <MBExpiryReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
