import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountingReportsLayout } from '@coop/accounting/ui-layouts';
import { ReportsAccountingLayout } from '@coop/cbs/reports/layout';
import { InventoryReportList } from '@coop/cbs/reports/list';

const InventoryReports = () => (
  <InventoryReportList reportParentLink="/accounting/reports/inventory" />
);

InventoryReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountingReportsLayout>
        <ReportsAccountingLayout>{page}</ReportsAccountingLayout>
      </AccountingReportsLayout>
    </MainLayout>
  );
};
export default InventoryReports;
