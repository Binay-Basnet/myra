import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberBalanceReport } from '@coop/cbs/reports';

const MemberBalanceReportPage = () => <MemberBalanceReport />;

export default MemberBalanceReportPage;

MemberBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
