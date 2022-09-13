import React from 'react';

import { ShareSettingsDividendPage } from '@coop/cbs/settings/share';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsShareLayout,
} from '@coop/cbs/settings/ui-layout';

const ShareDividend = () => <ShareSettingsDividendPage />;

export default ShareDividend;

ShareDividend.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsShareLayout>{page}</SettingsShareLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
