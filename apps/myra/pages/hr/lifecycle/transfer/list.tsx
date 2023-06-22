import { ReactElement } from 'react';

import { HrLifecycleTransferList } from '@coop/hr-module/lifecycle';
import { HREmployeeLifecycleSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

const AccountingQuickTransferList = () => <HrLifecycleTransferList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeLifecycleSidebarLayout>{page}</HREmployeeLifecycleSidebarLayout>
    </HRLayout>
  );
};
export default AccountingQuickTransferList;
