import { useRouter } from 'next/router';

import {
  SettingsCOPOMISLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { COPOMISReportSettings } from '@coop/settings/reports';

const COPOMISReportSettingsPage = () => {
  const router = useRouter();

  return <COPOMISReportSettings indicator={router.query['id'] as string} />;
};

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
