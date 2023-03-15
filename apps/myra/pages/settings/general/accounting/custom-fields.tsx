import { Box } from '@myra-ui';

import {
  SettingsAccountingLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const AccountingCustomFields = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SHARE" showError isErrorCentered>
    {/* <ShareSettingsGeneralPage /> */}
    <Box>Accounting Custom Fields</Box>
  </Can>
);

export default AccountingCustomFields;

AccountingCustomFields.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsAccountingLayout>{page}</SettingsAccountingLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
