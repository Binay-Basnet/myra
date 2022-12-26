import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberActiveInactiveReport } from '@coop/cbs/reports';

const MBankingExpiryReport = () => <MemberActiveInactiveReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
