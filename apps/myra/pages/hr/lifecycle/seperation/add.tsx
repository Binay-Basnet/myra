import { ReactElement } from 'react';

import { HrSeperationUpsert } from '@coop/hr-module/lifecycle';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const EmployeeTransferPage = () => <HrSeperationUpsert />;

EmployeeTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default EmployeeTransferPage;
