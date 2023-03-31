import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { CreditNoteForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const CreditNote = () => <CreditNoteForm />;

CreditNote.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default CreditNote;
