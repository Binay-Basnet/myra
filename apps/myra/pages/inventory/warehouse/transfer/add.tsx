import React, { ReactElement } from 'react';

import { WarehouseTransfer } from '@coop/inventory/warehouse';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddWarehouseTransferPage = () => <WarehouseTransfer />;

export default AddWarehouseTransferPage;

AddWarehouseTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
