import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BlockWithdrawSlipRequestsList } from '@coop/cbs/requests/lists';
import { WithdrawSlipLayout } from '@coop/myra/components';

const BlockWithdrawSlipRequestsListPage = () => <BlockWithdrawSlipRequestsList />;

export default BlockWithdrawSlipRequestsListPage;

BlockWithdrawSlipRequestsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>
    </MainLayout>
  );
};
