import { ReactElement } from 'react';

import { AddCustomer } from '@coop/accounting/sales';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddCustomerPage = () => <AddCustomer />;

AddCustomerPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddCustomerPage;
