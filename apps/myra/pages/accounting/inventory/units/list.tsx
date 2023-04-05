import { ReactElement } from 'react';

import { AccountingInventoryLayout, AccountingLayout } from '@coop/accounting/ui-layouts';
import { InventoryItemUnitsTable } from '@coop/myra/components';

const InventoryProduct = () => <InventoryItemUnitsTable />;

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingInventoryLayout>{page}</AccountingInventoryLayout>
    </AccountingLayout>
  );
};
export default InventoryProduct;
