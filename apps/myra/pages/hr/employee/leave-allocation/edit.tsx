import { ReactElement } from 'react';

import { LeaveAllocationAdd } from '@coop/hr/employee';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const EditLeaveAllocation = () => <LeaveAllocationAdd />;

EditLeaveAllocation.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};

export default EditLeaveAllocation;
