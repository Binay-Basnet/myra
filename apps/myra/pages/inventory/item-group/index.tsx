import { ReactElement } from 'react';
import {
  InventoryItemGroupTable,
  InventoryPageLayout,
} from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

const InventoryItemGroupPage = () => {
  return <InventoryItemGroupTable />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <InventoryPageLayout>{page}</InventoryPageLayout>{' '}
    </MainLayout>
  );
};
export default InventoryItemGroupPage;
