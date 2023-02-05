import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ClosedSavingAccountStatement } from '@coop/cbs/reports';

export const ClosedAccountStatementReport = () => <ClosedSavingAccountStatement />;

export default ClosedAccountStatementReport;

ClosedAccountStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
