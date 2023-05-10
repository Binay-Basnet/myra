import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { InventoryFeatureItemVariant } from '@coop/myra/inventory/item';

const AddNewItemPage = () => <InventoryFeatureItemVariant />;

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
