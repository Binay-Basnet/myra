import { ReactElement } from 'react';

import { SettingsDepositProducts } from '@coop/cbs/settings/deposit-products';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountDepositProductPage = () => <SettingsDepositProducts />;

AccountDepositProductPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountDepositProductPage;
