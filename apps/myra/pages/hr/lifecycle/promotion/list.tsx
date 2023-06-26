import { ReactElement } from 'react';

import { HrLifecyclePromotionList } from '@coop/hr-module/lifecycle';
import { HREmployeeLifecycleSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <HrLifecyclePromotionList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeLifecycleSidebarLayout>{page}</HREmployeeLifecycleSidebarLayout>
    </HRLayout>
  );
};
export default AccountingQuickTransferList;
