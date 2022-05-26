import { ReactElement } from 'react';

import { InventoryLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

const InventoryProduct = () => {
  return <MemberTable />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Products">{page}</InventoryLayout>;
};
export default InventoryProduct;
