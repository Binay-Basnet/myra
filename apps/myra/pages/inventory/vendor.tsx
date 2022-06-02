import { ReactElement } from 'react';
import {
  InventoryPageLayout,
  InventoryVendorTable,
} from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

const InventoryVendor = () => {
  return <InventoryVendorTable />;
};

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <InventoryPageLayout>{page}</InventoryPageLayout>{' '}
    </MainLayout>
  );
};
export default InventoryVendor;
