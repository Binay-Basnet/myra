import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { AccountingInventoryLayout, AccountingLayout } from '@coop/accounting/ui-layouts';
import {
  WarehouseAddModal,
  WarehouseListTable,
  WarehouseTreeView,
} from '@coop/inventory/warehouse';
import { InventoryWarehouseHeader } from '@coop/myra/inventory/ui-layout';

const InventoryProduct = () => {
  const router = useRouter();
  const [isAddMinorModalOpen, setIsAddMinorAccountModalOpen] = useState(false);
  const handleMinorAccountClose = () => {
    setIsAddMinorAccountModalOpen(false);
  };
  const tabList = [
    {
      title: 'warehouseListView',
      key: 'listView',
    },
    // {
    //   title: 'warehouseTreeView',
    //   key: 'treeView',
    // },
  ];

  return (
    <>
      {' '}
      <InventoryWarehouseHeader
        heading="warehouseLayoutWarehouse"
        tabItems={tabList}
        onClickHandler={() => setIsAddMinorAccountModalOpen(true)}
      />
      <Box mt="3.125rem">
        {(router.query['objState'] === 'listView' || !router.query['objState']) && (
          <WarehouseListTable />
        )}
        {router.query['objState'] === 'treeView' && <WarehouseTreeView />}
      </Box>
      <WarehouseAddModal
        isAddWareHouseModalOpen={isAddMinorModalOpen}
        handleWarehouseClose={handleMinorAccountClose}
      />
    </>
  );
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingInventoryLayout>{page}</AccountingInventoryLayout>
    </AccountingLayout>
  );
};
export default InventoryProduct;
