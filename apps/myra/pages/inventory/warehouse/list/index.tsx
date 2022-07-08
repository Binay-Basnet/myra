import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import {
  WarehouseListTable,
  WarehouseTreeView,
} from '@coop/inventory/warehouse';
import { WarehouseLayout } from '@coop/myra/components';
import { InventoryWarehouseHeader } from '@coop/myra/inventory/ui-layout';
import { Box, MainLayoutInventory } from '@coop/shared/ui';

const InventoryWarehousePage = () => {
  const router = useRouter();

  const tabList = [
    {
      title: 'warehouseListView',
      key: 'listView',
    },
    {
      title: 'warehouseTreeView',
      key: 'treeView',
    },
  ];
  return (
    <Box>
      <InventoryWarehouseHeader
        heading="warehouseLayoutWarehouse"
        tabItems={tabList}
      />
      <Box mt="50px">
        {(router.query['objState'] === 'listView' ||
          !router.query['objState']) && <WarehouseListTable />}
        {router.query['objState'] === 'treeView' && <WarehouseTreeView />}
      </Box>
    </Box>
  );
};

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
