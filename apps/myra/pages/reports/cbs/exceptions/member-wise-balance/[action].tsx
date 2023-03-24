import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ExceptionMemberBalanceReport } from '@coop/cbs/reports';

const MemberWiseBalanceExceptionReport = () => <ExceptionMemberBalanceReport />;

export default MemberWiseBalanceExceptionReport;

MemberWiseBalanceExceptionReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
