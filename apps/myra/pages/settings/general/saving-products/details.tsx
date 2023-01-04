import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { SavingDetailPageSidebarLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsSavingsDetailPage } from '@coop/settings/saving-product';

const SavingProductDetailsPage = () => <CbsSettingsSavingsDetailPage />;

SavingProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SavingDetailPageSidebarLayout>{page}</SavingDetailPageSidebarLayout>
    </MainLayout>
  );
};

export default SavingProductDetailsPage;
