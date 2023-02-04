import { ReactElement } from 'react';

import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';
import { CashTransferList } from '@coop/cbs/transfer';

const ServiceTransfer = () => <CashTransferList />;

ServiceTransfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default ServiceTransfer;
