import { ReactElement } from 'react';

import { NeosysFeatureClientsDetailsDocuments } from '@coop/neosys-admin/clients';
import {
  ClientDetailLayout,
  ClientsSiderbarLayout,
  MainLayout,
} from '@coop/neosys-admin/layout';

const ClientDetailDocument = () => {
  return <NeosysFeatureClientsDetailsDocuments />;
};

ClientDetailDocument.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ClientsSiderbarLayout>
        <ClientDetailLayout>{page}</ClientDetailLayout>
      </ClientsSiderbarLayout>
    </MainLayout>
  );
};
export default ClientDetailDocument;
