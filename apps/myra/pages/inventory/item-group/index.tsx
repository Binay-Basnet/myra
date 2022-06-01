import { ReactElement } from 'react';
import {
  InventoryItemGroupTable,
  InventoryPageLayout,
} from '@saccos/myra/components';
import Router from 'next/router';

const InventoryItemGroupPage = () => {
  return <InventoryItemGroupTable />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryPageLayout
      onBtnClick={() => {
        Router.push('/inventory/item-group/add-new-item-group');
      }}
      mainTitle="Item Group"
    >
      {page}
    </InventoryPageLayout>
  );
};
export default InventoryItemGroupPage;
