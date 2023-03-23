import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddBankTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddBankTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default Transfer;
