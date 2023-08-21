import { HcmEmployeeLeave } from '@coop/cbs/settings/feature-hcm';
import {
  SettingsEmployeeLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

export const EmployeeLeave = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_HCM_EMPLOYEE" showError isErrorCentered>
    <HcmEmployeeLeave />
  </Can>
);

EmployeeLeave.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsEmployeeLayout>{page}</SettingsEmployeeLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default EmployeeLeave;
