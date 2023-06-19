import { ReactElement } from 'react';

import { HrLeaveAdd } from '@coop/hr/employee';
import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const LeaveAdd = () => <HrLeaveAdd />;

LeaveAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default LeaveAdd;
