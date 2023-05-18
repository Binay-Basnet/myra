import { Box } from '@myra-ui';

import {
  SettingsCOPOMISLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const ReportSettingsPage = () => <Box>This is COMOPIS REport</Box>;

export default ReportSettingsPage;
ReportSettingsPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsCOPOMISLayout>{page}</SettingsCOPOMISLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
