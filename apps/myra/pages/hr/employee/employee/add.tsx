import { ReactElement } from 'react';

import { EmployeeAddForm } from '@coop/hr/employee';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const AddEmployee = () => <EmployeeAddForm />;

AddEmployee.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};

export default AddEmployee;
