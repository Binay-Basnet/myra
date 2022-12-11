import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { DetailPathBar, SavingDetailPageSidebarLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsSavingsDetailPage } from '@coop/settings/saving-product';

const SavingProductDetailsPage = () => (
  <>
    <DetailPathBar title="Savings Product" />
    <CbsSettingsSavingsDetailPage />
  </>
);

SavingProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SavingDetailPageSidebarLayout>{page}</SavingDetailPageSidebarLayout>
    </MainLayout>
  );
};

export default SavingProductDetailsPage;
