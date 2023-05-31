import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { HREmployeeSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <Box> HR- Employee - attendence</Box>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeSidebarLayout>{page}</HREmployeeSidebarLayout>
    </HRLayout>
  );
};
export default AccountingQuickTransferList;
