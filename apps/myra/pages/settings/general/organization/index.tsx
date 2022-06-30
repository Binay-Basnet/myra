import React from 'react';

import { CbsSettingsFeatureOrganization } from '@coop/cbs/settings/organization';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const Organization = () => {
  return <CbsSettingsFeatureOrganization />;
};

export default Organization;

Organization.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
