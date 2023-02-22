import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ExceptionMemberBalanceReport } from '@coop/cbs/reports';

const MemberWiseBalanceExceptionReport = () => <ExceptionMemberBalanceReport />;

export default MemberWiseBalanceExceptionReport;

MemberWiseBalanceExceptionReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
