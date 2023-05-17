import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { WarehouseRequestForm } from '@coop/inventory/warehouse';

const AddWarehouseTransferPage = () => <WarehouseRequestForm />;

export default AddWarehouseTransferPage;

AddWarehouseTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
