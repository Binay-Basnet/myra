import { ReactElement } from 'react';

import { SalaryStructureAssignmentAdd } from '@coop/hr/payroll';
import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const SalaryStructureAssignmentEditPage = () => <SalaryStructureAssignmentAdd />;

SalaryStructureAssignmentEditPage.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default SalaryStructureAssignmentEditPage;
