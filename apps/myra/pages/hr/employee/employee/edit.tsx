import { ReactElement } from 'react';

import { EmployeeAddForm } from '@coop/hr/employee';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const EditEmployee = () => <EmployeeAddForm />;

EditEmployee.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};

export default EditEmployee;
