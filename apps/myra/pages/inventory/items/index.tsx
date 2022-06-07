import { ReactElement } from 'react';
import { InventoryItemTable, InventoryPageLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/myra/ui';

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
