import { ReactElement } from 'react';
import { MainLayout, Scrollable } from '@myra-ui';

import { TellerReport } from '@coop/cbs/reports';

const ReportPage = () => <TellerReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
