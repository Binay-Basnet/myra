import { ReactElement } from 'react';

import { MainLayout } from '@coop/neosys-admin/layout';
import { NeosysFeatureUsersAdd } from '@coop/neosys-admin/users';

const AddUser = () => <NeosysFeatureUsersAdd />;

AddUser.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default AddUser;
