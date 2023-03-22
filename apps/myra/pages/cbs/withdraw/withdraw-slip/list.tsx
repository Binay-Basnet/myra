import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ChequeBookRequestList } from '@coop/cbs/requests/lists';
import { WithdrawSlipLayout } from '@coop/myra/components';

const ChequeBookRequestPage = () => <ChequeBookRequestList />;

export default ChequeBookRequestPage;

ChequeBookRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>
    </MainLayout>
  );
};
