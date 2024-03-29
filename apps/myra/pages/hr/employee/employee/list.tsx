import { ReactElement } from 'react';

import { EmployeeList } from '@coop/hr/employee';
import { HREmployeeSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <EmployeeList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeSidebarLayout>{page}</HREmployeeSidebarLayout>
    </HRLayout>
  );
};
export default AccountingQuickTransferList;
