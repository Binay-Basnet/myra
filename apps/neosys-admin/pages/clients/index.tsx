import { ReactElement } from 'react';

import { NeosysFeatureClients } from '@coop/neosys-admin/clients';
import { ClientsSiderbarLayout, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const ClientsListPage = () => {
  return <NeosysFeatureClients />;
};

ClientsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ClientsSiderbarLayout>{page}</ClientsSiderbarLayout>
    </MainLayout>
  );
};
export default ClientsListPage;
