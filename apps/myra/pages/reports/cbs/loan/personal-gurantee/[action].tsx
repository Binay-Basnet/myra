import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanPersonalGuranteeReport } from '@coop/cbs/reports';

export const LoanPersonalGuranteeReportPage = () => <LoanPersonalGuranteeReport />;

export default LoanPersonalGuranteeReportPage;

LoanPersonalGuranteeReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
