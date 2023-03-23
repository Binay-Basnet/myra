import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ClosedLoanStatementReport } from '@coop/cbs/reports';

export const ClosedLoanAccountStatementPage = () => <ClosedLoanStatementReport />;

export default ClosedLoanAccountStatementPage;

ClosedLoanAccountStatementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
