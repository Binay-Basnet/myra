import { SalaryComponents } from '@coop/cbs/settings/feature-hcm';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPayrollLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

export const SalaryStructurePage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SAVING_PARAMETERS" showError isErrorCentered>
    <SalaryComponents />
  </Can>
);

SalaryStructurePage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsPayrollLayout>{page}</SettingsPayrollLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default SalaryStructurePage;
