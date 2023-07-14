import { CbsSettingsFeatureHcm } from '@coop/cbs/settings/feature-hcm';
import {
  SettingsEmployeeLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

export const Employee = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SAVING_PARAMETERS" showError isErrorCentered>
    <CbsSettingsFeatureHcm />
  </Can>
);

Employee.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsEmployeeLayout>{page}</SettingsEmployeeLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default Employee;
