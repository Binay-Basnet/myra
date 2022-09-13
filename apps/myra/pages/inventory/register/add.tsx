import React, { ReactElement } from 'react';

import { AddInventory } from '@coop/inventory/inventory';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddNewInventoryRegisterPage = () => <AddInventory />;

export default AddNewInventoryRegisterPage;

AddNewInventoryRegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
