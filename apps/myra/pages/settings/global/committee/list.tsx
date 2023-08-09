import { SettingsGlobalLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CommitteListTable } from '@coop/settings/committee';

const Page = () => <CommitteListTable />;

export default Page;

Page.getLayout = (page) => (
  <SettingsLayout>
    <SettingsGlobalLayout>{page}</SettingsGlobalLayout>
  </SettingsLayout>
);
