import { SettingsGlobalLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CommitteeDetails } from '@coop/settings/committee';

const Page = () => <CommitteeDetails />;

export default Page;

Page.getLayout = (page) => (
  <SettingsLayout>
    <SettingsGlobalLayout>{page}</SettingsGlobalLayout>
  </SettingsLayout>
);
