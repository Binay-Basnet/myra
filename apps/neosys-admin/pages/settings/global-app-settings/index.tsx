import { ReactElement } from 'react';

import {
  GlobalAppSettingsLayout,
  MainLayout,
  SettingsLayout,
} from '@coop/neosys-admin/layout';
import { NeosysFeatureGlobalAppSettings } from '@coop/neosys-admin/settings';

const Settings = () => {
  return <NeosysFeatureGlobalAppSettings />;
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SettingsLayout>
        <GlobalAppSettingsLayout>{page}</GlobalAppSettingsLayout>
      </SettingsLayout>
    </MainLayout>
  );
};

export default Settings;
