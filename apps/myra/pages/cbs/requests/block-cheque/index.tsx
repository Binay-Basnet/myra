import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { BlockChequeRequest } from '@coop/cbs/requests/lists';
import { MainLayout } from '@myra-ui';

const BlockChequeRequestPage = () => <BlockChequeRequest />;

export default BlockChequeRequestPage;

BlockChequeRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
