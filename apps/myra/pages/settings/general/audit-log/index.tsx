import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Box } from '@coop/shared/ui';

const AuditLog = () => <Box w="full">Audit Log</Box>;

export default AuditLog;

AuditLog.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
