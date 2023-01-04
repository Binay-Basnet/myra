import { ShareSettingsGeneralPage } from '@coop/cbs/settings/share';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsShareLayout,
} from '@coop/cbs/settings/ui-layout';

const ShareGeneral = () => <ShareSettingsGeneralPage />;

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
