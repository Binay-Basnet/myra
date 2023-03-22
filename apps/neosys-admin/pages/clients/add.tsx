import { ReactElement } from 'react';

import { NeosysFeatureClientsAdd } from '@coop/neosys-admin/clients';
import { MainLayout } from '@coop/neosys-admin/layout';

const AddUser = () => <NeosysFeatureClientsAdd />;

AddUser.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default AddUser;
