import React, { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const ServiceCenterReports = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

ServiceCenterReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default ServiceCenterReports;
