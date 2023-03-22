import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { WithdrawViaCollectorList } from '@coop/cbs/requests/lists';

const WithDrawViaCollectorRequest = () => <WithdrawViaCollectorList />;

export default WithDrawViaCollectorRequest;

WithDrawViaCollectorRequest.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
