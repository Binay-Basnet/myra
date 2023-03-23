import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberRegisterReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <MemberRegisterReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
