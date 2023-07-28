import { ReactElement } from 'react';

import { WIPState } from '@myra-ui';

import { EmployeePortalMainLayout } from '@coop/employee-portal/layouts';

const Page = () => <WIPState />;

Page.getLayout = (page: ReactElement) => (
  <EmployeePortalMainLayout>{page}</EmployeePortalMainLayout>
);

export default Page;
