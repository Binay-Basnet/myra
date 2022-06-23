import React from 'react';

import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsShareLayout,
} from '@coop/cbs/settings/ui-layout';

const ShareMigration = () => {
  return <div>Share Migration</div>;
};

export default ShareMigration;

ShareMigration.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsShareLayout>{page}</SettingsShareLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
