import { EodHistory } from '@coop/cbs/settings/eod';
import {
  SettingsDayEndLayout,
  SettingsGlobalLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const EOD = () => <EodHistory />;

EOD.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>
        <SettingsDayEndLayout>{page}</SettingsDayEndLayout>
      </SettingsGlobalLayout>
    </SettingsLayout>
  );
};

export default EOD;
