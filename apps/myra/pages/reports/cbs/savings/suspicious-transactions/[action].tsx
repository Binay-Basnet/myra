import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { SuspiousTransactionReport } from '@coop/cbs/reports';

export const SavingStatementReportPage = () => <SuspiousTransactionReport />;

export default SavingStatementReportPage;

SavingStatementReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
