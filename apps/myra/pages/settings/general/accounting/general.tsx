import { Box } from '@myra-ui';

import {
  SettingsAccountingLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const AccountingGeneral = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SHARE" showError isErrorCentered>
    {/* <ShareSettingsGeneralPage /> */}
    <Box>Accounting General</Box>
  </Can>
);

export default AccountingGeneral;

AccountingGeneral.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsAccountingLayout>{page}</SettingsAccountingLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
