import { ReactElement } from 'react';

import { DepositProductTable } from '@coop/cbs/settings/deposit-products';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout, TableListPageHeader } from '@myra-ui';

// TODO ( Update this page when design arrives )
const AccountDepositProductPage = () => (
  <>
    <TableListPageHeader heading="Savings Products" />
    <DepositProductTable />
  </>
);

AccountDepositProductPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountDepositProductPage;
