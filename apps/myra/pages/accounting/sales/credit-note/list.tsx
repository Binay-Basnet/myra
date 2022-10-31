import { ReactElement } from 'react';

import { AccountingListCreditNote } from '@coop/accounting/sales';
import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

const CreditNote = () => <AccountingListCreditNote />;

CreditNote.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default CreditNote;
