import { ReactElement } from 'react';

import { MainLayout, SettingsLayout } from '@coop/neosys-admin/layout';
import { NeosysFeatureSettings } from '@coop/neosys-admin/settings';

const Settings = () => {
  return <NeosysFeatureSettings />;
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </MainLayout>
  );
};

export default Settings;
