import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { InventoryFeatureItemVariant } from '@coop/myra/inventory/item';

const AddNewItemPage = () => <InventoryFeatureItemVariant />;

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
