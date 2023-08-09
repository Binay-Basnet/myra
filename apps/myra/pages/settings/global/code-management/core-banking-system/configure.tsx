import { CoreBankingSystemCodeManagement } from 'libs/cbs/settings/feature-code-management/src';

import {
  SettingsCodeManagementLayout,
  SettingsGlobalLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const CBSCodeManagementPage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_CODE_MANAGEMENT" showError isErrorCentered>
    <CoreBankingSystemCodeManagement />
  </Can>
);

CBSCodeManagementPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>
        <SettingsCodeManagementLayout>{page}</SettingsCodeManagementLayout>
      </SettingsGlobalLayout>
    </SettingsLayout>
  );
};

export default CBSCodeManagementPage;
