import { ReactElement } from 'react';

import { AccountingFeatureAddChartsOfAccount } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingChartsOfAccountAdd = () => <AccountingFeatureAddChartsOfAccount />;

AccountingChartsOfAccountAdd.getLayout = function getLayout(
  page: ReactElement
) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingChartsOfAccountAdd;
