import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { HRLayout, HRTrainingSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <Box> HR- Employee</Box>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRTrainingSidebarayout>{page}</HRTrainingSidebarayout>
    </HRLayout>
  );
};
export default AccountingQuickTransferList;
