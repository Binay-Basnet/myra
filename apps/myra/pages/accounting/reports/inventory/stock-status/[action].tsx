import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { InventoryStockStatusReport } from '@coop/cbs/reports';

export const InventoryRegistrationReportPage = () => <InventoryStockStatusReport />;

export default InventoryRegistrationReportPage;

InventoryRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
