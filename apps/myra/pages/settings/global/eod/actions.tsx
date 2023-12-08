import { EodActions } from '@coop/cbs/settings/eod';
import {
  SettingsDayEndLayout,
  SettingsGlobalLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const EODActionsPage = () => <EodActions />;

export default EODActionsPage;

EODActionsPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>
        <SettingsDayEndLayout>{page}</SettingsDayEndLayout>
      </SettingsGlobalLayout>
    </SettingsLayout>
  );
};
