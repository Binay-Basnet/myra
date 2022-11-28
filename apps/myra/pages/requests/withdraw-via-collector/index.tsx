import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { WithdrawViaCollectorList } from '@coop/cbs/requests/lists';
import { MainLayout } from '@myra-ui';

const WithDrawViaCollectorRequest = () => <WithdrawViaCollectorList />;

export default WithDrawViaCollectorRequest;

WithDrawViaCollectorRequest.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
