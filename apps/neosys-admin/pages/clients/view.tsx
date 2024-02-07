import { ReactElement } from 'react';

import { NeosysFeatureClientView } from '@coop/neosys-admin/clients';
import { ClientsSiderbarLayout, MainLayout } from '@coop/neosys-admin/layout';

const ClientsView = () => <NeosysFeatureClientView />;

ClientsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ClientsSiderbarLayout>{page}</ClientsSiderbarLayout>
    </MainLayout>
  );
};
export default ClientsView;
