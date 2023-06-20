import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { InventoryItemSalesReport } from '@coop/cbs/reports';

export const InventoryRegistrationReportPage = () => <InventoryItemSalesReport />;

export default InventoryRegistrationReportPage;

InventoryRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
