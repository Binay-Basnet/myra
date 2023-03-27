import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { AddInventory } from '@coop/inventory/inventory';

const AddNewInventoryRegisterPage = () => <AddInventory />;

export default AddNewInventoryRegisterPage;

AddNewInventoryRegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
