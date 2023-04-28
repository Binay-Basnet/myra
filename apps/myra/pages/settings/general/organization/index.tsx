import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureOrgDetails } from '@coop/settings/org';

const Page = () => <CbsSettingsFeatureOrgDetails />;

export default Page;

Page.getLayout = (page) => (
  <SettingsLayout>
    <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
  </SettingsLayout>
);
