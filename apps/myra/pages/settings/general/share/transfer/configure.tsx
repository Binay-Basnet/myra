import React from 'react';

import { ShareSettingsTransfer } from '@coop/cbs/settings/share';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsShareLayout,
} from '@coop/cbs/settings/ui-layout';

const ShareTransfer = () => <ShareSettingsTransfer />;

export default ShareTransfer;

ShareTransfer.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsShareLayout>{page}</SettingsShareLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
