import { ReactElement } from 'react';

import { HRLayout, HRPayrollSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const SalaryStructureList = () => <>Wip</>;

SalaryStructureList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRPayrollSidebarayout>{page}</HRPayrollSidebarayout>
    </HRLayout>
  );
};
export default SalaryStructureList;
