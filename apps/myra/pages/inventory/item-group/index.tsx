import { ReactElement } from 'react';
import {
  InventoryItemGroupTable,
  InventoryPageLayout,
} from '@coop/myra/components';
import { MainLayout } from '@coop/myra/ui';

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
