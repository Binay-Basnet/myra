import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { WithdrawSlipBookPrint } from '@coop/cbs/requests/forms';

const WithdrawSlipBookPrintPage = () => <WithdrawSlipBookPrint />;

export default WithdrawSlipBookPrintPage;

WithdrawSlipBookPrintPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
