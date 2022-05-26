import { ReactElement } from 'react';

import { InventoryLayout } from '@saccos/myra/ui';
import { InventoryItemGroupTable } from '@saccos/myra/components';
import Router from 'next/router';

const InventoryItemGroupPage = () => {
  return <InventoryItemGroupTable />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryLayout
      onClick={() => {
        Router.push('/inventory/item-group/add-new-item-group');
      }}
      headingText="Item Group"
    >
      {page}
    </InventoryLayout>
  );
};
export default InventoryItemGroupPage;
