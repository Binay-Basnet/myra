import { ReactElement } from 'react';

import { InventoryLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

const InventoryItemGroupPage = () => {
  return <MemberTable />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryItemGroupPage;
