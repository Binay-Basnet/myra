import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountPagesLayout } from '@coop/myra/components';
import { CbsSettingsSavingsDetailPage } from '@coop/settings/saving-product';

const SavingProductDetailsPage = () => <CbsSettingsSavingsDetailPage />;

SavingProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};

export default SavingProductDetailsPage;
