import { WithdrawSlipPrintPreference } from '@coop/cbs/settings/print-preference';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPrintPreferenceLayout,
} from '@coop/cbs/settings/ui-layout';

const WithdrawSlipPrintPreferencePage = () => <WithdrawSlipPrintPreference />;

WithdrawSlipPrintPreferencePage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsPrintPreferenceLayout>{page}</SettingsPrintPreferenceLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default WithdrawSlipPrintPreferencePage;
