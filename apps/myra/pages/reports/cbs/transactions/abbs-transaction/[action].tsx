import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ABBSTransactionReport } from '@coop/cbs/reports';

const ABBSTransactionReportPage = () => <ABBSTransactionReport />;

export default ABBSTransactionReportPage;

ABBSTransactionReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
