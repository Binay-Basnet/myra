import { ReactElement } from 'react';

import { NeosysFeatureClientsAdd } from '@coop/neosys-admin/clients';
import { MainLayout } from '@coop/neosys-admin/layout';

const AddUser = () => {
  return <NeosysFeatureClientsAdd />;
};

AddUser.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default AddUser;
