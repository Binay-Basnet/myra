import { InventoryLayout, InventoryVendorTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

const InventoryVendor = () => {
  return <InventoryVendorTable />;
};

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryVendor;
