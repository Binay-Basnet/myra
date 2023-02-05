import { ReactElement } from 'react';

import { ServiceCenterCOAWiseBalanceReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ServiceCenterCOAWiseBalanceReportPage = () => <ServiceCenterCOAWiseBalanceReport />;

export default ServiceCenterCOAWiseBalanceReportPage;

ServiceCenterCOAWiseBalanceReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
