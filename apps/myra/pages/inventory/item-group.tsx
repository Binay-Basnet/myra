import { ReactElement } from 'react';

import { InventoryLayout } from '@saccos/myra/ui';
import { InventoryItemGroupTable } from '@saccos/myra/components';

const InventoryItemGroupPage = () => {
  return <InventoryItemGroupTable />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryItemGroupPage;
