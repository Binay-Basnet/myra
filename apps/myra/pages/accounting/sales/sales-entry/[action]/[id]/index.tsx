import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { NewSalesForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AccountingPurchaseList = () => <NewSalesForm />;

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AccountingPurchaseList;
