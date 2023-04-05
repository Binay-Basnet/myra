import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { WarehouseTransfer } from '@coop/inventory/warehouse';

const AddWarehouseTransferPage = () => <WarehouseTransfer />;

export default AddWarehouseTransferPage;

AddWarehouseTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
