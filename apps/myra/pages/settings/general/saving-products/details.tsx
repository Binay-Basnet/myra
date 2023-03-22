import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { SettingsGeneralLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsSavingsDetailPage } from '@coop/settings/saving-product';

const SavingProductDetailsPage = () => <CbsSettingsSavingsDetailPage />;

SavingProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </MainLayout>
  );
};

export default SavingProductDetailsPage;
