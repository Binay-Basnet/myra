import { ReactElement } from 'react';

import { MainLayout, UsersSiderbar } from '@coop/neosys-admin/layout';
import { NeosysFeatureUsers } from '@coop/neosys-admin/users';

const Users = () => {
  return <NeosysFeatureUsers />;
};

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <UsersSiderbar>{page}</UsersSiderbar>
    </MainLayout>
  );
};

export default Users;
