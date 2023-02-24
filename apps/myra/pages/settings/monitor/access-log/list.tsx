import { Box } from '@myra-ui';

import { SettingsLayout, SettingsMonitorLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureAccessLog } from '@coop/settings/access-log';

const AccessLog = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <CbsSettingsFeatureAccessLog />
  </Box>
);
export default AccessLog;
AccessLog.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsMonitorLayout>{page}</SettingsMonitorLayout>
    </SettingsLayout>
  );
};
