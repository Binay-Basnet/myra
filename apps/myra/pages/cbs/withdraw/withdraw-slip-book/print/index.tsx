import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { WithdrawSlipBookPrint } from '@coop/cbs/requests/forms';

const WithdrawSlipBookPrintPage = () => <WithdrawSlipBookPrint />;

export default WithdrawSlipBookPrintPage;

WithdrawSlipBookPrintPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
