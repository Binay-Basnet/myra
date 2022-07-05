import { ReactElement } from 'react';

import { MainLayout } from '@coop/neosys-admin/layout';
import { NeosysFeatureUsers } from '@coop/neosys-admin/users';

const Users = () => {
  return <NeosysFeatureUsers />;
};

Users.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Users;
