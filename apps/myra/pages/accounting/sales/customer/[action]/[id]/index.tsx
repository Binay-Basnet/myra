import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AddCustomer } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddCustomerPage = () => <AddCustomer />;

AddCustomerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddCustomerPage;
