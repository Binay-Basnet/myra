import { ReactElement } from 'react';

import { CreditNoteForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const CreditNote = () => <CreditNoteForm />;

CreditNote.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default CreditNote;
