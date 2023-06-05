import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { EmployeeAddForm } from '@coop/hr/employee';

const AddMember = () => <EmployeeAddForm />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default AddMember;
