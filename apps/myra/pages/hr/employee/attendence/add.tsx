import { ReactElement } from 'react';

import { AttendanceAdd } from '@coop/hr/employee';
import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AttendanceAddPage = () => <AttendanceAdd />;

AttendanceAddPage.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default AttendanceAddPage;
