import { Box } from '@myra-ui';

import { CBSSettingsAuditLog } from '@coop/cbs/audit-log';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const AuditLog = () => (
  <Box w="full">
    <CBSSettingsAuditLog />
  </Box>
);

export default AuditLog;

AuditLog.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
