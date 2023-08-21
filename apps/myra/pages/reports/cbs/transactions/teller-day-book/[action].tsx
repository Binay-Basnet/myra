import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TellerDayBookReport } from '@coop/cbs/reports';

const TellerDayBOokReportPage = () => <TellerDayBookReport />;

export default TellerDayBOokReportPage;

TellerDayBOokReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
