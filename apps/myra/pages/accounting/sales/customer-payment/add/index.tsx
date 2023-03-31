import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { CustomerPaymentForm } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const CustomerPayment = () => <CustomerPaymentForm />;

CustomerPayment.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default CustomerPayment;
