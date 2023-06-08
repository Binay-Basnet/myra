import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { LoanTransactionStatementReport } from '@coop/cbs/reports';

export const ReportPage = () => <LoanTransactionStatementReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
