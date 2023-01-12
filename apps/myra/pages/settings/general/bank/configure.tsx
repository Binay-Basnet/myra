import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';
import { CbsSettingsFeatureBank } from '@coop/settings/bank';

export const BankPage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_BANK" showError isErrorCentered>
    <CbsSettingsFeatureBank />
  </Can>
);

export default BankPage;

BankPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
