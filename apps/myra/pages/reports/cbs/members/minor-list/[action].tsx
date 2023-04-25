import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MinorListReport } from '@coop/cbs/reports';

const MinorListReportPage = () => <MinorListReport />;

export default MinorListReportPage;

MinorListReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
