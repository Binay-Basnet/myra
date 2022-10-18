import {
  SettingsAlternativeChannelLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { AlternativeChannels } from '@coop/settings/alternative-channels';

export const AlternativeChannelsChargesPage = () => <AlternativeChannels />;

export default AlternativeChannelsChargesPage;

AlternativeChannelsChargesPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsAlternativeChannelLayout>{page}</SettingsAlternativeChannelLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
