import { ReactElement } from 'react';

import { SalaryStructureAssignmentList } from '@coop/hr/payroll';
import { HRLayout, HRPayrollSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const SalaryStructureAssignmentListPage = () => <SalaryStructureAssignmentList />;

SalaryStructureAssignmentListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRPayrollSidebarayout>{page}</HRPayrollSidebarayout>
    </HRLayout>
  );
};
export default SalaryStructureAssignmentListPage;
