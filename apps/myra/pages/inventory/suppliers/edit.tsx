import { ReactElement } from 'react';

import { MainLayoutInventory, Scrollable } from '@myra-ui';

import { InventoryFeatureSuppliers } from '@coop/myra/inventory/suppliers';

const AddNewSuppliersPage = () => <InventoryFeatureSuppliers />;

export default AddNewSuppliersPage;

AddNewSuppliersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <Scrollable>{page}</Scrollable>
    </MainLayoutInventory>
  );
};
