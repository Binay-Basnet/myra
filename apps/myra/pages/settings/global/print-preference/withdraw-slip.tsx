import { WithdrawSlipPrintPreference } from '@coop/cbs/settings/print-preference';
import {
  SettingsGlobalLayout,
  SettingsLayout,
  SettingsPrintPreferenceLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const WithdrawSlipPrintPreferencePage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_PRINT_PREFERENCE" showError isErrorCentered>
    <WithdrawSlipPrintPreference />
  </Can>
);

WithdrawSlipPrintPreferencePage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>
        <SettingsPrintPreferenceLayout>{page}</SettingsPrintPreferenceLayout>
      </SettingsGlobalLayout>
    </SettingsLayout>
  );
};

export default WithdrawSlipPrintPreferencePage;
