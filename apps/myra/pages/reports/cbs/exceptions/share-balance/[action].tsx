import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ExceptionShareBalanceReport } from '@coop/cbs/reports';

const ShareExceptionBalanceReportPage = () => <ExceptionShareBalanceReport />;

export default ShareExceptionBalanceReportPage;

ShareExceptionBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
