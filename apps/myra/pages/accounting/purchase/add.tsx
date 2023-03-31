import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingFeaturePurchaseAdd } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseList = () => <AccountingFeaturePurchaseAdd />;

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AccountingPurchaseList;
