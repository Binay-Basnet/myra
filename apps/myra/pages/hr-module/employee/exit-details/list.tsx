import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { HRMODULEEmployeeSidebarLayout, HRModuleLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <Box> HR- leave Details</Box>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRModuleLayout>
      <HRMODULEEmployeeSidebarLayout>{page}</HRMODULEEmployeeSidebarLayout>
    </HRModuleLayout>
  );
};
export default AccountingQuickTransferList;
