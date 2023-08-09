import { CbsSettingsFeatureEod } from '@coop/cbs/settings/eod';
import {
  SettingsDayEndLayout,
  SettingsGlobalLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const EOD = () => <CbsSettingsFeatureEod />;

export default EOD;
EOD.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>
        <SettingsDayEndLayout>{page}</SettingsDayEndLayout>
      </SettingsGlobalLayout>
    </SettingsLayout>
  );
};
