import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { ExternalLoanPaymentAdd } from '@coop/accouting/loan';

// TODO ( Update this page when design arrives )
const AddExternalLoanPayment = () => <ExternalLoanPaymentAdd />;

AddExternalLoanPayment.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddExternalLoanPayment;
