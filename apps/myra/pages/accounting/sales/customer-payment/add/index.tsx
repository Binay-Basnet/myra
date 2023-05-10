import { ReactElement } from 'react';

import { CustomerPaymentForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const CustomerPayment = () => <CustomerPaymentForm />;

CustomerPayment.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default CustomerPayment;
