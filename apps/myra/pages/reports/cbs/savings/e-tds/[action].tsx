import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ETDSReport } from '@coop/cbs/reports';

export const ETDSReportPage = () => <ETDSReport />;

export default ETDSReportPage;

ETDSReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
