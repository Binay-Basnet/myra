import { ReactElement } from 'react';

import { AttendanceDetails } from '@coop/hr/employee';
import { HREmployeeSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AttendanceDetailsPage = () => <AttendanceDetails />;

AttendanceDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      {' '}
      <HREmployeeSidebarLayout>{page} </HREmployeeSidebarLayout>
    </HRLayout>
  );
};
export default AttendanceDetailsPage;
