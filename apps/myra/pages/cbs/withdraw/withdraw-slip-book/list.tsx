import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { WithdrawSlipBookList } from '@coop/cbs/requests/lists';
import { WithdrawSlipLayout } from '@coop/myra/components';

const WithdrawSlipBookListPage = () => <WithdrawSlipBookList />;

export default WithdrawSlipBookListPage;

WithdrawSlipBookListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>
    </MainLayout>
  );
};
