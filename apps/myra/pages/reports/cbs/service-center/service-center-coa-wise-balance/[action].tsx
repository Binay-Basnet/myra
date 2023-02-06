import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ServiceCenterCOAWiseBalanceReport } from '@coop/cbs/reports';

const ServiceCenterCOAWiseBalanceReportPage = () => <ServiceCenterCOAWiseBalanceReport />;

export default ServiceCenterCOAWiseBalanceReportPage;

ServiceCenterCOAWiseBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
