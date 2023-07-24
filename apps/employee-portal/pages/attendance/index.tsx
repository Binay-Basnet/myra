import { ReactElement } from 'react';

import { EmployeeAttendancePage } from '@coop/employee-portal/attendance';
import { EmployeePortalMainLayout } from '@coop/employee-portal/layouts';

const Page = () => <EmployeeAttendancePage />;

Page.getLayout = (page: ReactElement) => (
  <EmployeePortalMainLayout>{page}</EmployeePortalMainLayout>
);

export default Page;
