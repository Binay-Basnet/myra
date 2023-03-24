import { SavingsOrganizationRate } from '@coop/cbs/settings/deposit';
import {
  SettingsDepositLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const OrganizationRate = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SAVING_PARAMETERS" showError isErrorCentered>
    <SavingsOrganizationRate />
  </Can>
);

export default OrganizationRate;

OrganizationRate.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDepositLayout>{page}</SettingsDepositLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
