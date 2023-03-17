import { CbsSettingsFeatureEod } from '@coop/cbs/settings/eod';
import {
  SettingsDayEndLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const EOD = () => <CbsSettingsFeatureEod />;

export default EOD;
EOD.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDayEndLayout>{page}</SettingsDayEndLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
