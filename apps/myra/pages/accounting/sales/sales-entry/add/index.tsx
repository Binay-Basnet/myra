import { ReactElement } from 'react';

import { NewSalesForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AccountingPurchaseList = () => <NewSalesForm />;

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingPurchaseList;
