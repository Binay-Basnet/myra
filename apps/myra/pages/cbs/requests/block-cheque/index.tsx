import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { BlockChequeRequest } from '@coop/cbs/requests/lists';

const BlockChequeRequestPage = () => <BlockChequeRequest />;

export default BlockChequeRequestPage;

BlockChequeRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
