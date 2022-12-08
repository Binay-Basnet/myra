import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { VaultBalanceReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <VaultBalanceReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
