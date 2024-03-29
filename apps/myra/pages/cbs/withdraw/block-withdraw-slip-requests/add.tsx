import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddBlockWithdrawSlipRequest } from '@coop/cbs/requests/forms';

const AddBlockWithdrawSlipRequestPage = () => <AddBlockWithdrawSlipRequest />;

export default AddBlockWithdrawSlipRequestPage;

AddBlockWithdrawSlipRequestPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
