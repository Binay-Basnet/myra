import { ReactElement } from 'react';

import { ClientsListPage } from '@coop/neosys-admin/clients';
import { ClientsSiderbarLayout, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const Clients = () => <ClientsListPage />;

Clients.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ClientsSiderbarLayout>{page}</ClientsSiderbarLayout>
    </MainLayout>
  );
};
export default Clients;
