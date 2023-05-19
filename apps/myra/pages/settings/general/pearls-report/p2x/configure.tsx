import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPEARLSLayout,
} from '@coop/cbs/settings/ui-layout';
import { PEARLSReportSettings } from '@coop/settings/reports';

const ReportSettingsPage = () => <PEARLSReportSettings indicator="P2X" />;

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
