import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddCashTransitTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddCashTransitTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default Transfer;
