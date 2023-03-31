import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoanAccountsAdd } from '@coop/accouting/loan';

// TODO ( Update this page when design arrives )
const AddExternalLoanAccount = () => <ExternalLoanAccountsAdd />;

AddExternalLoanAccount.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddExternalLoanAccount;
