import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { InventoryPurchaseOrderReport } from '@coop/cbs/reports';

export const InventoryRegistrationReportPage = () => <InventoryPurchaseOrderReport />;

export default InventoryRegistrationReportPage;

InventoryRegistrationReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
