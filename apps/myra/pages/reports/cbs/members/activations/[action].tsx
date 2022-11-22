import { ReactElement } from 'react';

import { MemberActiveInactiveReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

const MBankingExpiryReport = () => <MemberActiveInactiveReport />;

export default MBankingExpiryReport;

MBankingExpiryReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
