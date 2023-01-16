import { Box } from '@myra-ui';

import { CBSSettingsAuditLog } from '@coop/cbs/audit-log';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const AuditLog = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_AUDIT_LOG" showError isErrorCentered>
    <Box w="full">
      <CBSSettingsAuditLog />
    </Box>
  </Can>
);

export default AuditLog;

AuditLog.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
