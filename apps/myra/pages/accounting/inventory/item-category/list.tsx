import { ReactElement } from 'react';

import { AccountingInventoryLayout, AccountingLayout } from '@coop/accounting/ui-layouts';
import { InventoryItemCategoryTable } from '@coop/myra/components';

const InventoryProduct = () => <InventoryItemCategoryTable />;

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingInventoryLayout>{page}</AccountingInventoryLayout>
    </AccountingLayout>
  );
};
export default InventoryProduct;
