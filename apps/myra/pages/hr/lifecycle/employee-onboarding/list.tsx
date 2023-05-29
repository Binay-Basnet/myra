import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { HREmployeeLifecycleSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <Box> HR- Employee</Box>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeLifecycleSidebarLayout>{page}</HREmployeeLifecycleSidebarLayout>
    </HRLayout>
  );
};
export default AccountingQuickTransferList;
