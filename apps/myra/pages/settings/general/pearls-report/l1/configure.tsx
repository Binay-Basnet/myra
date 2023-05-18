import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPEARLSLayout,
} from '@coop/cbs/settings/ui-layout';
import { ReportSettings } from '@coop/settings/reports';

const ReportSettingsPage = () => <ReportSettings indicator="L1" />;

export default ReportSettingsPage;
ReportSettingsPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsPEARLSLayout>{page}</SettingsPEARLSLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
