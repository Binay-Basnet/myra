import { ReactElement } from 'react';

// import { AccountingFeatureChartsOfAccountList } from '@coop/accounting/accounting';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';
import { WorkInProgress } from '@coop/shared/components';
import { Box } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountingChartsOfAccountList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );

  // <AccountingFeatureChartsOfAccountList />;
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
