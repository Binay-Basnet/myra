import { ReactElement } from 'react';
import {
  InventoryPageLayout,
  InventoryVendorTable,
} from '@saccos/myra/components';

const InventoryVendor = () => {
  return <InventoryVendorTable />;
};

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryPageLayout mainTitle="Item Group">{page}</InventoryPageLayout>
  );
};
export default InventoryVendor;
