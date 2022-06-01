import { ReactElement } from 'react';
import { InventoryItemTable, InventoryLayout } from '@saccos/myra/components';
import Router from 'next/router';

const InventoryProduct = () => {
  return <InventoryItemTable />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryLayout
      headingText="Products"
      onClick={() => {
        Router.push('/inventory/items/add-new-item');
      }}
    >
      {page}
    </InventoryLayout>
  );
};
export default InventoryProduct;
