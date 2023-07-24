import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberTransferReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <MemberTransferReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
