import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddBlockWithdrawSlipRequest } from '@coop/cbs/requests/forms';

const AddBlockWithdrawSlipRequestPage = () => <AddBlockWithdrawSlipRequest />;

export default AddBlockWithdrawSlipRequestPage;

AddBlockWithdrawSlipRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
