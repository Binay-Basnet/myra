import { Box } from '@myra-ui';

import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPEARLSLayout,
} from '@coop/cbs/settings/ui-layout';

const ReportSettingsPage = () => <Box>This is pearls REport</Box>;

export default ReportSettingsPage;
ReportSettingsPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsPEARLSLayout>{page}</SettingsPEARLSLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
