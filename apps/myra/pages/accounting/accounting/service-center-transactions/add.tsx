import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { AddCashTransfer } from '@coop/cbs/transfer';

const ServiceCenterTransfer = () => <AddCashTransfer />;

ServiceCenterTransfer.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default ServiceCenterTransfer;
