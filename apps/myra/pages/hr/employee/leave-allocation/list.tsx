import { ReactElement } from 'react';

import { LeaveAllocationList } from '@coop/hr/employee';
import { HREmployeeSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const LeaveAllocationListPage = () => <LeaveAllocationList />;

LeaveAllocationListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeSidebarLayout>{page}</HREmployeeSidebarLayout>
    </HRLayout>
  );
};
export default LeaveAllocationListPage;
