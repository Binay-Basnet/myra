import { ReactElement } from 'react';

import { HrLeaveAdd } from '@coop/hr/employee';
import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const LeaveEdit = () => <HrLeaveAdd />;

LeaveEdit.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default LeaveEdit;
