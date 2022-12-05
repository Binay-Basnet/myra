import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { DetailPathBar, SavingDetailPageSidebarLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureSavingProductDetail } from '@coop/settings/saving-product';

const SavingProductDetailsPage = () => (
  <>
    <DetailPathBar title="Deposit Product" />
    <CbsSettingsFeatureSavingProductDetail />
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
