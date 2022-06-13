import { ReactElement } from 'react';
import {
  InventoryItemGroupTable,
  InventoryItemsGroupLayout,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryItemGroupPage = () => {
  return <InventoryItemGroupTable />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsGroupLayout>{page}</InventoryItemsGroupLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryItemGroupPage;
