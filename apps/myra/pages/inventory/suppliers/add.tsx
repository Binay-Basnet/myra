import React, { ReactElement } from 'react';

import { InventoryFeatureSuppliers } from '@coop/myra/inventory/suppliers';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddNewSuppliersPage = () => <InventoryFeatureSuppliers />;

export default AddNewSuppliersPage;

AddNewSuppliersPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
