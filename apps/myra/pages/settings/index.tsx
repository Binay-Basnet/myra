import { Box } from '@myra-ui';

import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Settings = () => <Box />;

export default Settings;
Settings.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
