import {
  SettingsCOPOMISLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { ReportSettings } from '@coop/settings/reports';

const COPOMISReportSettingsPage = () => <ReportSettings indicator="A1" />;

export default COPOMISReportSettingsPage;

COPOMISReportSettingsPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsCOPOMISLayout>{page}</SettingsCOPOMISLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
