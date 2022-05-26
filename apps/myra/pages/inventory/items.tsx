import { ReactElement } from 'react';

import { InventoryLayout } from '@saccos/myra/ui';
import { InventoryItemTable } from '@saccos/myra/components';

const InventoryProduct = () => {
  return <InventoryItemTable />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Products">{page}</InventoryLayout>;
};
export default InventoryProduct;
