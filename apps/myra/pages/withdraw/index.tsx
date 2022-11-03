import { ReactElement } from 'react';

import { WithdrawSlipLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const WithdrawSlip = () => <>Withdraw</>;

WithdrawSlip.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>{' '}
    </MainLayout>
  );
};

export default WithdrawSlip;
