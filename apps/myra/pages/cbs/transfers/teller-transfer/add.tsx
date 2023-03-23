import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddTellerTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddTellerTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default Transfer;
