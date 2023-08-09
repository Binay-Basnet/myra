import { EodHistoryDetail } from '@coop/cbs/settings/eod';
import { SettingsGlobalLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const EOD = () => <EodHistoryDetail />;

export default EOD;
EOD.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>{page}</SettingsGlobalLayout>
    </SettingsLayout>
  );
};
