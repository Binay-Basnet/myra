import { ReactElement } from 'react';

import { BlockChequeRequest } from '@coop/cbs/requests/lists';
import { WithdrawSlipLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const BlockChequeRequestPage = () => <BlockChequeRequest />;

export default BlockChequeRequestPage;

BlockChequeRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>
    </MainLayout>
  );
};
