import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberActiveInactiveReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <MemberActiveInactiveReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
