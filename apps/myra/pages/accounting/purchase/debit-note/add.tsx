import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingFeaturePurchaseAddDebitNote } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseDebitNoteAdd = () => <AccountingFeaturePurchaseAddDebitNote />;

AccountingPurchaseDebitNoteAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AccountingPurchaseDebitNoteAdd;
