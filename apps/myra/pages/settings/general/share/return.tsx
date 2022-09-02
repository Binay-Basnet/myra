import React from 'react';

import { ShareSettingsReturn } from '@coop/cbs/settings/share';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsShareLayout,
} from '@coop/cbs/settings/ui-layout';

const ShareFeeAndCharges = () => {
  return <ShareSettingsReturn />;
};

export default ShareFeeAndCharges;

ShareFeeAndCharges.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsShareLayout>{page}</SettingsShareLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
