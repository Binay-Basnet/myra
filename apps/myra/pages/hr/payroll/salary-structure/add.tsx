import { ReactElement } from 'react';

import { SalaryStructureAdd } from '@coop/hr/payroll';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const SalaryStructureAddPage = () => <SalaryStructureAdd />;

SalaryStructureAddPage.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default SalaryStructureAddPage;
