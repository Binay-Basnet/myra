import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberBalanceReport } from '@coop/cbs/reports';

const MemberBalanceReportPage = () => <MemberBalanceReport />;

export default MemberBalanceReportPage;

MemberBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
