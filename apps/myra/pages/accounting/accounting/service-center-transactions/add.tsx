import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { AddCashTransfer } from '@coop/cbs/transfer';

const ServiceCenterTransfer = () => <AddCashTransfer />;

ServiceCenterTransfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default ServiceCenterTransfer;
