import { ReactElement } from 'react';
import {
  InventoryVendorsLayout,
  InventoryVendorTable,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/myra/ui';

const InventoryVendor = () => {
  return <InventoryVendorTable />;
};

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryVendorsLayout>{page}</InventoryVendorsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryVendor;
