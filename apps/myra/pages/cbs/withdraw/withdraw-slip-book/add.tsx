import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddWithdrawSlipBook } from '@coop/cbs/requests/forms';

const AddWithdrawSlipBookPage = () => <AddWithdrawSlipBook />;

export default AddWithdrawSlipBookPage;

AddWithdrawSlipBookPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
