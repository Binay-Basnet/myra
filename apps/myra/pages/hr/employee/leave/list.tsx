import { ReactElement } from 'react';

import { HrLeaveList } from '@coop/hr/employee';
import { HREmployeeSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const LeaveList = () => <HrLeaveList />;

LeaveList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeSidebarLayout>{page}</HREmployeeSidebarLayout>
    </HRLayout>
  );
};
export default LeaveList;
