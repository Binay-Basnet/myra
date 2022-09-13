import { ReactElement } from 'react';

// import { AccountingFeatureChartsOfAccountList } from '@coop/accounting/accounting';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';
import { Box, WIPState } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountingChartsOfAccountList = () =>
   (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  )

  // <AccountingFeatureChartsOfAccountList />;
;

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
