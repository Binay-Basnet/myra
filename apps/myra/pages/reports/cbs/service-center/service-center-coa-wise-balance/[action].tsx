import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ServiceCenterCOAWiseBalanceReport } from '@coop/cbs/reports';

const ServiceCenterCOAWiseBalanceReportPage = () => <ServiceCenterCOAWiseBalanceReport />;

export default ServiceCenterCOAWiseBalanceReportPage;

ServiceCenterCOAWiseBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
