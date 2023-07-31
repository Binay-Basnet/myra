import { ReactElement } from 'react';

import { EmployeePortalMainLayout } from '@coop/employee-portal/layouts';
import { EmployeeLeavePage } from '@coop/employee-portal/leave';

const Page = () => <EmployeeLeavePage />;

Page.getLayout = (page: ReactElement) => (
  <EmployeePortalMainLayout>{page}</EmployeePortalMainLayout>
);

export default Page;
