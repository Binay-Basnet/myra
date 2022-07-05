import { ReactElement } from 'react';

import { NeosysFeatureClientsDetailsOverview } from '@coop/neosys-admin/clients';
import {
  ClientDetailLayout,
  ClientsSiderbarLayout,
  MainLayout,
} from '@coop/neosys-admin/layout';

const ClientDetails = () => {
  return <NeosysFeatureClientsDetailsOverview />;
};

ClientDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ClientsSiderbarLayout>
        <ClientDetailLayout>{page}</ClientDetailLayout>
      </ClientsSiderbarLayout>
    </MainLayout>
  );
};
export default ClientDetails;
