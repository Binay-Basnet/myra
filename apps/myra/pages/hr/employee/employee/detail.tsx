import { ReactElement } from 'react';

import { EmployeeDetails } from '@coop/hr/employee';
import { HREmployeeSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

const EmployeeDetailPage = () => <EmployeeDetails />;

EmployeeDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeSidebarLayout>{page}</HREmployeeSidebarLayout>
    </HRLayout>
  );
};

export default EmployeeDetailPage;
