import { ReactElement } from 'react';

import { AccountingDebitNotesDetails } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingDebitNotesDetailsPage = () => <AccountingDebitNotesDetails />;

AccountingDebitNotesDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingDebitNotesDetailsPage;
