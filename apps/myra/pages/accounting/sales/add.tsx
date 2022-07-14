import { ReactElement } from 'react';

import { NewSalesForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseList = () => {
  return <NewSalesForm />;
};

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingPurchaseList;
