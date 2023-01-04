import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { TellerTransferList } from '@coop/cbs/requests/lists';
import { MainLayout } from '@myra-ui';

const TellerTransferRequestPage = () => <TellerTransferList />;

export default TellerTransferRequestPage;

TellerTransferRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
