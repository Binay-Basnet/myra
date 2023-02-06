import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ServviceCenterBalanceReport } from '@coop/cbs/reports';

const ServiceCenterBalance = () => <ServviceCenterBalanceReport />;

export default ServiceCenterBalance;

ServiceCenterBalance.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
