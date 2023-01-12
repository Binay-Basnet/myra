import { CbsSettingsFeatureMembers } from '@coop/cbs/settings/members';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsMemberLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const Members = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_KYM_SETTING" showError isErrorCentered>
    <CbsSettingsFeatureMembers />
  </Can>
);

export default Members;
Members.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsMemberLayout>{page}</SettingsMemberLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
