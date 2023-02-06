import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ClosedLoanStatementReport } from '@coop/cbs/reports';

export const ClosedLoanAccountStatementPage = () => <ClosedLoanStatementReport />;

export default ClosedLoanAccountStatementPage;

ClosedLoanAccountStatementPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
