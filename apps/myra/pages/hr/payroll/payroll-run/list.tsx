import { ReactElement } from 'react';

import { HRPayrollEntryList } from '@coop/hr/payroll';
import { HRLayout, HRPayrollSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const PayrollRunList = () => <HRPayrollEntryList />;

PayrollRunList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRPayrollSidebarayout>{page}</HRPayrollSidebarayout>
    </HRLayout>
  );
};
export default PayrollRunList;
