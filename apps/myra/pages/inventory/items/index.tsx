import { ReactElement } from 'react';
import {
  InventoryItemTable,
  InventoryPageLayout,
} from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

const InventoryProduct = () => {
  return <InventoryItemTable />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <InventoryPageLayout>{page}</InventoryPageLayout>{' '}
    </MainLayout>
  );
};
export default InventoryProduct;
