import { ReactElement } from 'react';

import { HrPayrollEntryUpsert } from '@coop/hr/payroll';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const PayrollRunEdit = () => <HrPayrollEntryUpsert />;

PayrollRunEdit.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default PayrollRunEdit;
