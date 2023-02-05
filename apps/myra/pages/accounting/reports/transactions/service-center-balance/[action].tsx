import { ReactElement } from 'react';

import { ServviceCenterBalanceReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ServiceCenterBalance = () => <ServviceCenterBalanceReport />;

export default ServiceCenterBalance;

ServiceCenterBalance.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
