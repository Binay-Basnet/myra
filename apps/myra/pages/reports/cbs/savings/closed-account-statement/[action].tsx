import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ClosedSavingAccountStatement } from '@coop/cbs/reports';

export const ClosedAccountStatementReport = () => <ClosedSavingAccountStatement />;

export default ClosedAccountStatementReport;

ClosedAccountStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
