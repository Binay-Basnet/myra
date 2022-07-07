import React, { ReactElement } from 'react';

import { InventoryFeatureVendors } from '@coop/myra/inventory/vendors';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddNewVendorPage = () => {
  return <InventoryFeatureVendors />;
};

export default AddNewVendorPage;

AddNewVendorPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
