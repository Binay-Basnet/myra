import {
  SettingsAlternativeChannelUtilityPaymentLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';
import { AlternativeChannelUtilityServiceSetting } from '@coop/settings/alternative-channels';

export const AlternativeChannelsChargesPage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_ALTERNATIVE_CHANNELS" showError isErrorCentered>
    <AlternativeChannelUtilityServiceSetting />
  </Can>
);
export default AlternativeChannelsChargesPage;

AlternativeChannelsChargesPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsAlternativeChannelUtilityPaymentLayout>
          {page}
        </SettingsAlternativeChannelUtilityPaymentLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
