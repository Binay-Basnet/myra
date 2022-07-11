import { ReactElement } from 'react';

import { AccountingFeaturePurchaseAddDebitNote } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseDebitNoteAdd = () => {
  return <AccountingFeaturePurchaseAddDebitNote />;
};

AccountingPurchaseDebitNoteAdd.getLayout = function getLayout(
  page: ReactElement
) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingPurchaseDebitNoteAdd;
