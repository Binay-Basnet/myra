import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { TellerTransferList } from '@coop/cbs/requests/lists';

const TellerTransferRequestPage = () => <TellerTransferList />;

export default TellerTransferRequestPage;

TellerTransferRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
