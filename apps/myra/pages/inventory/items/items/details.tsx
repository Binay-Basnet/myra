import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemsLayout } from '@coop/myra/components';
import { InventoryItemDetails } from '@coop/myra/inventory/item';

// TODO ( Update this page when design arrives )
const InventoryItemDetailsPage = () => <InventoryItemDetails />;

InventoryItemDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryItemDetailsPage;
