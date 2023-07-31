import { ReactElement } from 'react';

import { EmployeeHomePage } from '@coop/employee-portal/home';
import { EmployeePortalMainLayout } from '@coop/employee-portal/layouts';

const Page = () => <EmployeeHomePage />;

Page.getLayout = (page: ReactElement) => (
  <EmployeePortalMainLayout>{page}</EmployeePortalMainLayout>
);

export default Page;
