import { ReactElement } from 'react';

import { MainLayout } from '@coop/neosys-admin/layout';
import { NeosysFeatureUsersAdd } from '@coop/neosys-admin/users';

const AddUser = () => {
  return <NeosysFeatureUsersAdd />;
};

AddUser.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddUser;
