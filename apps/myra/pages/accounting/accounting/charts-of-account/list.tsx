import { ReactElement } from 'react';

import { AccountingFeatureChartsOfAccountList } from '@coop/accounting/accounting';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingChartsOfAccountList = () => {
  return <AccountingFeatureChartsOfAccountList />;
};

AccountingChartsOfAccountList.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingChartsOfAccountList;
