import { ReactElement } from 'react';

import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsSavingsDetailPage } from '@coop/settings/saving-product';

const SavingProductDetailsPage = () => <CbsSettingsSavingsDetailPage />;

SavingProductDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default SavingProductDetailsPage;
