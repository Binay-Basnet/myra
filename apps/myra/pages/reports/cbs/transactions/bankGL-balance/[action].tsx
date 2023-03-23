import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { BankGLBalanceReport } from '@coop/cbs/reports';

const ReportPage = () => <BankGLBalanceReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
