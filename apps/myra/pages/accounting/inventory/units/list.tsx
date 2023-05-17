import { ReactElement } from 'react';

import { AccountingInventoryLayout, AccountingLayout } from '@coop/accounting/ui-layouts';
import { InventoryItemUnitsTable } from '@coop/myra/inventory/item';

const InventoryProduct = () => <InventoryItemUnitsTable />;

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingInventoryLayout>{page}</AccountingInventoryLayout>
    </AccountingLayout>
  );
};
export default InventoryProduct;
