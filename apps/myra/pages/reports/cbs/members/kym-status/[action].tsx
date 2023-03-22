import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { KYMStatusReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <KYMStatusReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
