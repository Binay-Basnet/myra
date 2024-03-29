import { ReactElement } from 'react';

import { MainLayout, PageHeader } from '@myra-ui';

import { DepositProductTable } from '@coop/cbs/settings/deposit-products';
import { AccountPagesLayout } from '@coop/myra/components';
import { featureCode } from '@coop/shared/utils';

// TODO ( Update this page when design arrives )
const AccountDepositProductPage = () => (
  <>
    <PageHeader heading={`Savings Products - ${featureCode?.savingProductList}`} />
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
