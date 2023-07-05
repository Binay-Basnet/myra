import { ReactElement } from 'react';

import { HrPayrollEntryUpsert } from '@coop/hr/payroll';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const EmployeeTransferPage = () => <HrPayrollEntryUpsert />;

EmployeeTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default EmployeeTransferPage;
