import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoanAccountsAdd } from '@coop/accouting/loan';

// TODO ( Update this page when design arrives )
const AddExternalLoanAccount = () => <ExternalLoanAccountsAdd />;

AddExternalLoanAccount.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddExternalLoanAccount;
