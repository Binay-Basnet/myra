import { CbsSettingsFeatureOrganization } from '@coop/cbs/settings/organization';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Organization = () => <CbsSettingsFeatureOrganization />;

export default Organization;

Organization.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
