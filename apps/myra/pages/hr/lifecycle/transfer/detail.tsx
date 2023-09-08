import { ReactElement } from 'react';

import { HREmployeeLifecycleSidebarLayout, HRLayout } from '@coop/hr-module/ui-layouts';

const EmployeeLifecycleDetail = () => <>lifecycle details</>;

EmployeeLifecycleDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HREmployeeLifecycleSidebarLayout>{page}</HREmployeeLifecycleSidebarLayout>
    </HRLayout>
  );
};
export default EmployeeLifecycleDetail;
