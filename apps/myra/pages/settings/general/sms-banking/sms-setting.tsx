import {
  SettingsAlternativeChannelSMSBankingLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';
import { AlternativeChannelSMSBankingSMSSetting } from '@coop/settings/alternative-channels';

export const AlternativeChannelsSMSBankingSMSSettingPage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_ALTERNATIVE_CHANNELS" showError isErrorCentered>
    <AlternativeChannelSMSBankingSMSSetting />
  </Can>
);
export default AlternativeChannelsSMSBankingSMSSettingPage;

AlternativeChannelsSMSBankingSMSSettingPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsAlternativeChannelSMSBankingLayout>
          {page}
        </SettingsAlternativeChannelSMSBankingLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
