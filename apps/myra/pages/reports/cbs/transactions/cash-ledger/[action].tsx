import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CashLedgersReport } from '@coop/cbs/reports';

const ReportPage = () => <CashLedgersReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
