import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanPersonalGuranteeReport } from '@coop/cbs/reports';

export const LoanPersonalGuranteeReportPage = () => <LoanPersonalGuranteeReport />;

export default LoanPersonalGuranteeReportPage;

LoanPersonalGuranteeReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
