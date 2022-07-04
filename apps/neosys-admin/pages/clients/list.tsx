import { ReactElement } from 'react';

import { NeosysFeatureClientsList } from '@coop/neosys-admin/clients';
import { ClientsSiderbarLayout, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const ClientsListPage = () => {
  return <NeosysFeatureClientsList />;
};

ClientsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ClientsSiderbarLayout>{page}</ClientsSiderbarLayout>
    </MainLayout>
  );
};
export default ClientsListPage;
