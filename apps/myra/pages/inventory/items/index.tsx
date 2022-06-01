import { ReactElement } from 'react';
import {
  InventoryItemTable,
  InventoryPageLayout,
} from '@saccos/myra/components';
import Router from 'next/router';

const InventoryProduct = () => {
  return <InventoryItemTable />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryPageLayout
      mainTitle="Products"
      onBtnClick={() => {
        Router.push('/inventory/items/add-new-item');
      }}
    >
      {page}
    </InventoryPageLayout>
  );
};
export default InventoryProduct;
