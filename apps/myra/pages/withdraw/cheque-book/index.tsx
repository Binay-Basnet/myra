import { ReactElement } from 'react';

import { ChequeBookRequestList } from '@coop/cbs/requests/lists';
import { WithdrawSlipLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const ChequeBookRequestPage = () => <ChequeBookRequestList />;

export default ChequeBookRequestPage;

ChequeBookRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>
    </MainLayout>
  );
};
