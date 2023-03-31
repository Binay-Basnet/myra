import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoanPaymentAdd } from '@coop/accouting/loan';

// TODO ( Update this page when design arrives )
const AddExternalLoanPayment = () => <ExternalLoanPaymentAdd />;

AddExternalLoanPayment.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddExternalLoanPayment;
