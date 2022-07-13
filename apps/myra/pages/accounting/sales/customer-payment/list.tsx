import { ReactElement } from 'react';

import { AccountingCustomerPayment } from '@coop/accounting/sales';
import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const CustomerPayment = () => {
  return <AccountingCustomerPayment />;
};

CustomerPayment.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default CustomerPayment;
