import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { VaultBalanceReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <VaultBalanceReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
