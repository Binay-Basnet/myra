import { ShareSettingsGeneralPage } from '@coop/cbs/settings/share';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsShareLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const ShareGeneral = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SHARE" showError isErrorCentered>
    <ShareSettingsGeneralPage />
  </Can>
);

export default ShareGeneral;

ShareGeneral.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsShareLayout>{page}</SettingsShareLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
